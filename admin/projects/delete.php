<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$project = $conn->query("SELECT * FROM projects WHERE id = $id AND deleted_at IS NULL")->fetch_assoc();

if ($project) {
  $stmt = $conn->prepare("UPDATE projects SET deleted_at = NOW() WHERE id = ?");
  $stmt->bind_param('i', $id);
  $stmt->execute();
  logActivity('delete', 'project', $id, "Deleted project: {$project['title']}");
}

header('Location: /intona/admin/projects/index.php');
exit;
