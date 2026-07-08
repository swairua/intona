<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

if ($_SESSION['admin_role'] !== 'admin') { header('Location: /intona/admin/dashboard.php'); exit; }

$conn = getDb();
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = trim($_POST['name'] ?? '');
  $email = trim($_POST['email'] ?? '');
  $password = $_POST['password'] ?? '';
  $role = $_POST['role'] ?? 'editor';
  if (!$name || !$email || strlen($password) < 6) { $error = 'All fields required, password min 6 chars.'; }
  else {
    $hash = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $conn->prepare("INSERT INTO admin_users (name, email, password_hash, role, password_changed_at) VALUES (?, ?, ?, ?, NOW())");
    $stmt->bind_param('ssss', $name, $email, $hash, $role);
    if ($stmt->execute()) {
      logActivity('create', 'admin_user', $stmt->insert_id, "Created admin user: $name ($email)");
      header('Location: /intona/admin/users/index.php'); exit;
    }
    $error = $conn->error;
  }
}

$pageTitle = 'New Admin User';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header">New Admin User</div>
  <div class="card-body">
    <?php if ($error): ?><div class="alert alert-danger"><?= esc($error) ?></div><?php endif; ?>
    <form method="post">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Name *</label><input type="text" name="name" class="form-control" required></div>
        <div class="col-md-6"><label class="form-label">Email *</label><input type="email" name="email" class="form-control" required></div>
        <div class="col-md-6"><label class="form-label">Password *</label><input type="password" name="password" class="form-control" minlength="6" required></div>
        <div class="col-md-6"><label class="form-label">Role</label>
          <select name="role" class="form-select">
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="col-12"><button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Create</button></div>
      </div>
    </form>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
