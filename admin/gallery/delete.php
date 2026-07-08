<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$item = $conn->query("SELECT * FROM gallery WHERE id = $id")->fetch_assoc();
if ($item) {
  $file = $_SERVER['DOCUMENT_ROOT'] . $item['image'];
  if (file_exists($file)) @unlink($file);
  $conn->query("DELETE FROM gallery WHERE id = $id");
  logActivity('delete', 'gallery', $id, "Deleted gallery image: {$item['title']}");
}
header('Location: /intona/admin/gallery/index.php');
exit;
