<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!verifyCsrf($_POST['csrf'] ?? '')) { $error = 'Invalid token.'; }
  else {
    $title = trim($_POST['title'] ?? '');
    $slug = slugify($title) . '-' . uniqid();
    $description = $_POST['description'] ?? '';
    $icon = $_POST['icon'] ?? '';
    $category = $_POST['category'] ?? '';
    $sortOrder = (int)($_POST['sort_order'] ?? 0);
    $image = null;

    if (!empty($_FILES['image']['name'])) {
      $image = uploadImage($_FILES['image'], 'general');
    }
    if (!$title) { $error = 'Title is required.'; }
    else {
      $stmt = $conn->prepare("INSERT INTO services (title, slug, description, icon, image, category, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)");
      $stmt->bind_param('ssssssi', $title, $slug, $description, $icon, $image, $category, $sortOrder);
      if ($stmt->execute()) {
        logActivity('create', 'service', $stmt->insert_id, "Created service: $title");
        header('Location: /intona/admin/services/index.php');
        exit;
      }
      $error = $conn->error;
    }
  }
}

$pageTitle = 'New Service';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header">New Service</div>
  <div class="card-body">
    <?php if ($error): ?><div class="alert alert-danger"><?= esc($error) ?></div><?php endif; ?>
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Title *</label>
          <input type="text" name="title" class="form-control" required>
        </div>
        <div class="col-md-3">
          <label class="form-label">Icon (Lucide name)</label>
          <input type="text" name="icon" class="form-control" placeholder="Building2, Route...">
        </div>
        <div class="col-md-3">
          <label class="form-label">Category</label>
          <select name="category" class="form-select">
            <option value="construction">Construction</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="engineering">Engineering</option>
            <option value="consultancy">Consultancy</option>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label">Description</label>
          <textarea name="description" class="form-control" rows="4"></textarea>
        </div>
        <div class="col-md-6">
          <label class="form-label">Image</label>
          <input type="file" name="image" class="form-control" accept="image/*">
        </div>
        <div class="col-md-3">
          <label class="form-label">Sort Order</label>
          <input type="number" name="sort_order" class="form-control" value="0">
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Create</button>
          <a href="/intona/admin/services/index.php" class="btn btn-outline-secondary">Cancel</a>
        </div>
      </div>
    </form>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
