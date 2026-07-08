<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$item = $conn->query("SELECT * FROM team_members WHERE id = $id")->fetch_assoc();
if ($item) {
  $conn->query("DELETE FROM team_members WHERE id = $id");
  logActivity('delete', 'team', $id, "Deleted team member: {$item['name']}");
}
header('Location: /intona/admin/team/index.php');
exit;
