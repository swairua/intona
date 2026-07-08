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
    $role = $_POST['role'] ?? '';
    $bio = $_POST['bio'] ?? '';
    $email = $_POST['email'] ?? '';
    $sortOrder = (int)($_POST['sort_order'] ?? 0);
    $image = null;

    if (!empty($_FILES['image']['name'])) $image = uploadImage($_FILES['image'], 'team');
    if (!$name) { $error = 'Name is required.'; }
    else {
      $stmt = $conn->prepare("INSERT INTO team_members (name, role, bio, email, image, sort_order) VALUES (?, ?, ?, ?, ?, ?)");
      $stmt->bind_param('sssssi', $name, $role, $bio, $email, $image, $sortOrder);
      if ($stmt->execute()) {
        logActivity('create', 'team', $stmt->insert_id, "Added team member: $name");
        header('Location: /intona/admin/team/index.php');
        exit;
      }
      $error = $conn->error;
    }
  }
}
$pageTitle = 'New Team Member';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header">New Team Member</div>
  <div class="card-body">
    <?php if ($error): ?><div class="alert alert-danger"><?= esc($error) ?></div><?php endif; ?>
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Name *</label><input type="text" name="name" class="form-control" required></div>
        <div class="col-md-6"><label class="form-label">Role</label><input type="text" name="role" class="form-control" placeholder="Managing Director"></div>
        <div class="col-md-6"><label class="form-label">Email</label><input type="email" name="email" class="form-control"></div>
        <div class="col-md-3"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="0"></div>
        <div class="col-md-3"><label class="form-label">Photo</label><input type="file" name="image" class="form-control" accept="image/*"></div>
        <div class="col-12"><label class="form-label">Bio</label><textarea name="bio" class="form-control" rows="4"></textarea></div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Create</button>
          <a href="/intona/admin/team/index.php" class="btn btn-outline-secondary">Cancel</a>
        </div>
      </div>
    </form>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
