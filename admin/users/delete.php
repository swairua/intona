<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

if ($_SESSION['admin_role'] !== 'admin') { header('Location: /intona/admin/dashboard.php'); exit; }

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
if ($id !== (int)$_SESSION['admin_id']) {
  $user = $conn->query("SELECT * FROM admin_users WHERE id = $id")->fetch_assoc();
  if ($user) {
    $conn->query("DELETE FROM admin_users WHERE id = $id");
    logActivity('delete', 'admin_user', $id, "Deleted admin user: {$user['name']}");
  }
}
header('Location: /intona/admin/users/index.php');
exit;
