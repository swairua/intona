<?php
$conn = getDb();

$category = $_GET['category'] ?? '';
$where = "WHERE deleted_at IS NULL";
$params = [];
$types = '';
if ($category) { $where .= " AND category = ?"; $params[] = $category; $types .= 's'; }

$sql = "SELECT * FROM services $where ORDER BY sort_order ASC";
$stmt = $conn->prepare($sql);
if ($params) $stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

echo json_encode(['success' => true, 'data' => $result]);
