<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$item = $conn->query("SELECT * FROM testimonials WHERE id = $id")->fetch_assoc();
if ($item) {
  $conn->query("DELETE FROM testimonials WHERE id = $id");
  logActivity('delete', 'testimonial', $id, "Deleted testimonial from {$item['name']}");
}
header('Location: /intona/admin/testimonials/index.php');
exit;
