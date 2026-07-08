<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$conn->query("DELETE FROM career_applications WHERE id = $id");
logActivity('delete', 'application', $id, 'Deleted career application');
header('Location: /intona/admin/careers/index.php');
exit;
