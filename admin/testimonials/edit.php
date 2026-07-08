<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$item = $conn->query("SELECT * FROM testimonials WHERE id = $id")->fetch_assoc();
if (!$item) { header('Location: /intona/admin/testimonials/index.php'); exit; }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = trim($_POST['name'] ?? '');
  $company = $_POST['company'] ?? '';
  $role = $_POST['role'] ?? '';
  $content = $_POST['content'] ?? '';
  $rating = (int)($_POST['rating'] ?? 5);
  $active = isset($_POST['active']) ? 1 : 0;
  $sortOrder = (int)($_POST['sort_order'] ?? 0);
  $image = $item['image'];
  if (!empty($_FILES['image']['name'])) { $img = uploadImage($_FILES['image'], 'general'); if ($img) $image = $img; }
  if ($name && $content) {
    $stmt = $conn->prepare("UPDATE testimonials SET name=?, company=?, role=?, content=?, rating=?, image=?, active=?, sort_order=? WHERE id=?");
    $stmt->bind_param('ssssisiii', $name, $company, $role, $content, $rating, $image, $active, $sortOrder, $id);
    $stmt->execute();
    logActivity('update', 'testimonial', $id, "Updated testimonial from $name");
    header('Location: /intona/admin/testimonials/index.php'); exit;
  }
}

$pageTitle = 'Edit Testimonial';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header d-flex justify-content-between">
    <span>Edit Testimonial</span>
    <a href="/intona/admin/testimonials/index.php" class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-left"></i> Back</a>
  </div>
  <div class="card-body">
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Name *</label><input type="text" name="name" class="form-control" value="<?= esc($item['name']) ?>" required></div>
        <div class="col-md-6"><label class="form-label">Company</label><input type="text" name="company" class="form-control" value="<?= esc($item['company']) ?>"></div>
        <div class="col-md-6"><label class="form-label">Role</label><input type="text" name="role" class="form-control" value="<?= esc($item['role']) ?>"></div>
        <div class="col-md-3"><label class="form-label">Rating</label><select name="rating" class="form-select"><?php for ($i=5;$i>=1;$i--): ?><option value="<?=$i?>" <?=$item['rating']===$i?'selected':''?>><?=$i?> ⭐</option><?php endfor; ?></select></div>
        <div class="col-md-3">
          <label class="form-label">Photo</label>
          <?php if ($item['image']): ?><div class="mb-2"><img src="<?= $item['image'] ?>" class="image-preview"></div><?php endif; ?>
          <input type="file" name="image" class="form-control" accept="image/*">
          <div class="form-check mt-2"><input type="checkbox" name="active" class="form-check-input" id="active" <?=$item['active']?'checked':''?>><label class="form-check-label" for="active">Active</label></div>
        </div>
        <div class="col-12"><label class="form-label">Content *</label><textarea name="content" class="form-control" rows="4" required><?= esc($item['content']) ?></textarea></div>
        <div class="col-md-3"><label class="form-label">Order</label><input type="number" name="sort_order" class="form-control" value="<?= $item['sort_order'] ?>"></div>
        <div class="col-12"><button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Save</button><a href="/intona/admin/testimonials/index.php" class="btn btn-outline-secondary ms-2">Cancel</a></div>
      </div>
    </form>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
