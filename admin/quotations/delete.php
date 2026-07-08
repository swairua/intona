<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$conn->query("DELETE FROM quotations WHERE id = $id");
logActivity('delete', 'quotation', $id, 'Deleted quotation request');
header('Location: /intona/admin/quotations/index.php');
exit;
