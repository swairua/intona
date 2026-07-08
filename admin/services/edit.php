<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$service = $conn->query("SELECT * FROM services WHERE id = $id AND deleted_at IS NULL")->fetch_assoc();
if (!$service) { header('Location: /intona/admin/services/index.php'); exit; }

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!verifyCsrf($_POST['csrf'] ?? '')) { $error = 'Invalid token.'; }
  else {
    $title = trim($_POST['title'] ?? '');
    $slug = slugify($title);
    $description = $_POST['description'] ?? '';
    $icon = $_POST['icon'] ?? '';
    $category = $_POST['category'] ?? '';
    $sortOrder = (int)($_POST['sort_order'] ?? 0);
    $image = $service['image'];

    if (!empty($_FILES['image']['name'])) {
      $img = uploadImage($_FILES['image'], 'general');
      if ($img) $image = $img;
    }
    if (!$title) { $error = 'Title is required.'; }
    else {
      $stmt = $conn->prepare("UPDATE services SET title=?, slug=?, description=?, icon=?, image=?, category=?, sort_order=? WHERE id=?");
      $stmt->bind_param('ssssssii', $title, $slug, $description, $icon, $image, $category, $sortOrder, $id);
      if ($stmt->execute()) {
        logActivity('update', 'service', $id, "Updated service: $title");
        $success = true;
        $service = $conn->query("SELECT * FROM services WHERE id = $id")->fetch_assoc();
      }
      $error = $conn->error;
    }
  }
}

$pageTitle = 'Edit Service';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header d-flex justify-content-between">
    <span>Edit Service</span>
    <a href="/intona/admin/services/index.php" class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-left"></i> Back</a>
  </div>
  <div class="card-body">
    <?php if (isset($success)): ?><div class="alert alert-success">Saved.</div><?php endif; ?>
    <?php if ($error): ?><div class="alert alert-danger"><?= esc($error) ?></div><?php endif; ?>
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Title *</label>
          <input type="text" name="title" class="form-control" value="<?= esc($service['title']) ?>" required>
        </div>
        <div class="col-md-3">
          <label class="form-label">Icon</label>
          <input type="text" name="icon" class="form-control" value="<?= esc($service['icon']) ?>">
        </div>
        <div class="col-md-3">
          <label class="form-label">Category</label>
          <select name="category" class="form-select">
            <?php foreach (['construction','infrastructure','engineering','consultancy'] as $c): ?>
            <option value="<?= $c ?>" <?= $service['category'] === $c ? 'selected' : '' ?>><?= ucfirst($c) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label">Description</label>
          <textarea name="description" class="form-control tinymce" rows="4"><?= esc($service['description']) ?></textarea>
        </div>
        <div class="col-md-6">
          <label class="form-label">Image</label>
          <?php if ($service['image']): ?><div class="mb-2"><img src="<?= $service['image'] ?>" class="image-preview"></div><?php endif; ?>
          <input type="file" name="image" class="form-control" accept="image/*">
        </div>
        <div class="col-md-3">
          <label class="form-label">Sort Order</label>
          <input type="number" name="sort_order" class="form-control" value="<?= $service['sort_order'] ?>">
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Save</button>
          <a href="/intona/admin/services/index.php" class="btn btn-outline-secondary">Cancel</a>
        </div>
      </div>
    </form>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
