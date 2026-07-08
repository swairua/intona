<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$item = $conn->query("SELECT * FROM news WHERE id = $id AND deleted_at IS NULL")->fetch_assoc();
if ($item) {
  $conn->query("UPDATE news SET deleted_at = NOW() WHERE id = $id");
  logActivity('delete', 'news', $id, "Deleted article: {$item['title']}");
}
header('Location: /intona/admin/news/index.php');
exit;
