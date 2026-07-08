<?php
session_start();
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/schema.php';
require_once __DIR__ . '/includes/auth.php';
runSchema();

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = trim($_POST['email'] ?? '');
  $password = $_POST['password'] ?? '';

  if ($email && $password) {
    $conn = getDb();
    $stmt = $conn->prepare("SELECT id, name, email, password_hash, role, active FROM admin_users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $res = $stmt->get_result();
    $user = $res->fetch_assoc();

    if ($user && $user['active'] && password_verify($password, $user['password_hash'])) {
      $_SESSION['admin_id'] = $user['id'];
      $_SESSION['admin_name'] = $user['name'];
      $_SESSION['admin_email'] = $user['email'];
      $_SESSION['admin_role'] = $user['role'];

      $conn->query("UPDATE admin_users SET last_login = NOW() WHERE id = {$user['id']}");
      logActivity('login', 'admin', $user['id'], 'Admin login');

      header('Location: /intona/admin/dashboard.php');
      exit;
    }
    $error = 'Invalid email or password.';
  } else {
    $error = 'Please enter email and password.';
  }
}
?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login — Intona Admin</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="/intona/admin/assets/css/admin.css" rel="stylesheet">
  <style>
    body { background: #1a1a1a; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .login-card { width: 100%; max-width: 420px; border: none; border-radius: 1rem; overflow: hidden; }
    .login-header { background: #1a1a1a; padding: 2rem; text-align: center; }
    .login-header h1 { color: #fff; font-weight: 900; font-size: 1.75rem; letter-spacing: -.02em; margin: 0; }
    .login-header p { color: #F68B2D; font-size: .75rem; text-transform: uppercase; letter-spacing: .15em; margin: .25rem 0 0; }
    .login-body { padding: 2rem; }
    .brand-bar { height: 4px; background: linear-gradient(90deg, #F68B2D, #f8a455); }
  </style>
</head>
<body>
  <div class="login-card shadow-lg">
    <div class="brand-bar"></div>
    <div class="login-header">
      <h1>INTONA</h1>
      <p>Admin Portal</p>
    </div>
    <div class="login-body bg-white">
      <?php if ($error): ?>
        <div class="alert alert-danger py-2 small"><?= esc($error) ?></div>
      <?php endif; ?>
      <form method="post">
        <div class="mb-3">
          <label class="form-label small fw-medium">Email</label>
          <input type="email" name="email" class="form-control" placeholder="admin@intona.com" required autofocus>
        </div>
        <div class="mb-4">
          <label class="form-label small fw-medium">Password</label>
          <input type="password" name="password" class="form-control" placeholder="Enter password" required>
        </div>
        <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold">Sign In</button>
      </form>
      <p class="text-center text-muted small mt-3 mb-0">Default: admin@intona.com / admin123</p>
    </div>
  </div>
</body>
</html>
