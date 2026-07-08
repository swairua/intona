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
    $name = trim($_POST['name'] ?? '');
    $company = $_POST['company'] ?? '';
    $role = $_POST['role'] ?? '';
    $content = $_POST['content'] ?? '';
    $rating = (int)($_POST['rating'] ?? 5);
    $active = isset($_POST['active']) ? 1 : 0;
    $sortOrder = (int)($_POST['sort_order'] ?? 0);
    $image = null;
    if (!empty($_FILES['image']['name'])) $image = uploadImage($_FILES['image'], 'general');
    if (!$name || !$content) { $error = 'Name and content are required.'; }
    else {
      $stmt = $conn->prepare("INSERT INTO testimonials (name, company, role, content, rating, image, active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
      $stmt->bind_param('ssssisii', $name, $company, $role, $content, $rating, $image, $active, $sortOrder);
      $stmt->execute();
      logActivity('create', 'testimonial', $stmt->insert_id, "Added testimonial from $name");
      header('Location: /intona/admin/testimonials/index.php'); exit;
    }
  }
}

$pageTitle = 'New Testimonial';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header">New Testimonial</div>
  <div class="card-body">
    <?php if ($error): ?><div class="alert alert-danger"><?= esc($error) ?></div><?php endif; ?>
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Name *</label><input type="text" name="name" class="form-control" required></div>
        <div class="col-md-6"><label class="form-label">Company</label><input type="text" name="company" class="form-control"></div>
        <div class="col-md-6"><label class="form-label">Role</label><input type="text" name="role" class="form-control"></div>
        <div class="col-md-3"><label class="form-label">Rating</label><select name="rating" class="form-select"><?php for ($i=5;$i>=1;$i--): ?><option value="<?=$i?>"><?=$i?> ⭐</option><?php endfor; ?></select></div>
        <div class="col-md-3">
          <label class="form-label">Photo</label><input type="file" name="image" class="form-control" accept="image/*">
          <div class="form-check mt-2"><input type="checkbox" name="active" class="form-check-input" id="active" checked><label class="form-check-label" for="active">Active</label></div>
        </div>
        <div class="col-12"><label class="form-label">Content *</label><textarea name="content" class="form-control" rows="4" required></textarea></div>
        <div class="col-md-3"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="0"></div>
        <div class="col-12"><button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Create</button><a href="/intona/admin/testimonials/index.php" class="btn btn-outline-secondary ms-2">Cancel</a></div>
      </div>
    </form>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
