<?php
$conn = getDb();
$category = $_GET['category'] ?? '';
$where = '';
$params = [];
$types = '';
if ($category) { $where = "WHERE category = ?"; $params[] = $category; $types .= 's'; }

$sql = "SELECT * FROM gallery $where ORDER BY sort_order ASC, created_at DESC";
$stmt = $conn->prepare($sql);
if ($params) $stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

echo json_encode(['success' => true, 'data' => $result]);
