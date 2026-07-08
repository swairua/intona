<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$item = $conn->query("SELECT * FROM team_members WHERE id = $id")->fetch_assoc();
if (!$item) { header('Location: /intona/admin/team/index.php'); exit; }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = trim($_POST['name'] ?? '');
  $role = $_POST['role'] ?? '';
  $bio = $_POST['bio'] ?? '';
  $email = $_POST['email'] ?? '';
  $sortOrder = (int)($_POST['sort_order'] ?? 0);
  $image = $item['image'];
  if (!empty($_FILES['image']['name'])) { $img = uploadImage($_FILES['image'], 'team'); if ($img) $image = $img; }
  if ($name) {
    $stmt = $conn->prepare("UPDATE team_members SET name=?, role=?, bio=?, email=?, image=?, sort_order=? WHERE id=?");
    $stmt->bind_param('sssssii', $name, $role, $bio, $email, $image, $sortOrder, $id);
    $stmt->execute();
    logActivity('update', 'team', $id, "Updated team member: $name");
    header('Location: /intona/admin/team/index.php'); exit;
  }
}

$pageTitle = 'Edit Team Member';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header d-flex justify-content-between">
    <span>Edit Team Member</span>
    <a href="/intona/admin/team/index.php" class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-left"></i> Back</a>
  </div>
  <div class="card-body">
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Name *</label><input type="text" name="name" class="form-control" value="<?= esc($item['name']) ?>" required></div>
        <div class="col-md-6"><label class="form-label">Role</label><input type="text" name="role" class="form-control" value="<?= esc($item['role']) ?>"></div>
        <div class="col-md-6"><label class="form-label">Email</label><input type="email" name="email" class="form-control" value="<?= esc($item['email']) ?>"></div>
        <div class="col-md-3"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="<?= $item['sort_order'] ?>"></div>
        <div class="col-md-3">
          <label class="form-label">Photo</label>
          <?php if ($item['image']): ?><div class="mb-2"><img src="<?= $item['image'] ?>" class="image-preview"></div><?php endif; ?>
          <input type="file" name="image" class="form-control" accept="image/*">
        </div>
        <div class="col-12"><label class="form-label">Bio</label><textarea name="bio" class="form-control tinymce" rows="4"><?= esc($item['bio']) ?></textarea></div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Save</button>
          <a href="/intona/admin/team/index.php" class="btn btn-outline-secondary">Cancel</a>
        </div>
      </div>
    </form>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
