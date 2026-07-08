<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

if ($_SESSION['admin_role'] !== 'admin') { header('Location: /intona/admin/dashboard.php'); exit; }

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$user = $conn->query("SELECT * FROM admin_users WHERE id = $id")->fetch_assoc();
if (!$user) { header('Location: /intona/admin/users/index.php'); exit; }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = trim($_POST['name'] ?? '');
  $role = $_POST['role'] ?? 'editor';
  $active = isset($_POST['active']) ? 1 : 0;
  $password = $_POST['password'] ?? '';

  if ($name) {
    if ($password) {
      $hash = password_hash($password, PASSWORD_BCRYPT);
      $stmt = $conn->prepare("UPDATE admin_users SET name=?, role=?, active=?, password_hash=?, password_changed_at=NOW() WHERE id=?");
      $stmt->bind_param('ssisi', $name, $role, $active, $hash, $id);
    } else {
      $stmt = $conn->prepare("UPDATE admin_users SET name=?, role=?, active=? WHERE id=?");
      $stmt->bind_param('ssii', $name, $role, $active, $id);
    }
    $stmt->execute();
    logActivity('update', 'admin_user', $id, "Updated admin user: $name");
    header('Location: /intona/admin/users/index.php'); exit;
  }
}

$pageTitle = 'Edit User';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header d-flex justify-content-between">
    <span>Edit User</span>
    <a href="/intona/admin/users/index.php" class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-left"></i> Back</a>
  </div>
  <div class="card-body">
    <form method="post">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Name *</label><input type="text" name="name" class="form-control" value="<?= esc($user['name']) ?>" required></div>
        <div class="col-md-6"><label class="form-label">Email</label><input type="email" class="form-control" value="<?= esc($user['email']) ?>" disabled></div>
        <div class="col-md-4"><label class="form-label">Role</label>
          <select name="role" class="form-select">
            <option value="editor" <?= $user['role'] === 'editor' ? 'selected' : '' ?>>Editor</option>
            <option value="admin" <?= $user['role'] === 'admin' ? 'selected' : '' ?>>Admin</option>
          </select>
        </div>
        <div class="col-md-4"><label class="form-label">New Password (leave blank to keep)</label><input type="password" name="password" class="form-control" minlength="6"></div>
        <div class="col-md-4 d-flex align-items-end">
          <div class="form-check"><input type="checkbox" name="active" class="form-check-input" id="active" <?=$user['active']?'checked':''?>><label class="form-check-label" for="active">Active</label></div>
        </div>
        <div class="col-12"><button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Save</button></div>
      </div>
    </form>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
