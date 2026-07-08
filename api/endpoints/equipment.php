<?php
$conn = getDb();
$availability = $_GET['availability'] ?? '';
$where = '';
$params = [];
$types = '';
if ($availability) { $where = "WHERE availability = ?"; $params[] = $availability; $types .= 's'; }

$sql = "SELECT * FROM equipment $where ORDER BY sort_order ASC";
$stmt = $conn->prepare($sql);
if ($params) $stmt->bind_param($types, ...$params);
$stmt->execute();
$items = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

foreach ($items as &$item) {
  $item['specifications'] = json_decode($item['specifications'] ?: '{}', true);
}

echo json_encode(['success' => true, 'data' => $items]);
