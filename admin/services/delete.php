<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$item = $conn->query("SELECT * FROM services WHERE id = $id AND deleted_at IS NULL")->fetch_assoc();
if ($item) {
  $conn->query("UPDATE services SET deleted_at = NOW() WHERE id = $id");
  logActivity('delete', 'service', $id, "Deleted service: {$item['title']}");
}
header('Location: /intona/admin/services/index.php');
exit;
