<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$conn->query("DELETE FROM contacts WHERE id = $id");
logActivity('delete', 'contact', $id, 'Deleted contact message');
header('Location: /intona/admin/contacts/index.php');
exit;
