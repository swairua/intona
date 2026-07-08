<?php
$conn = getDb();
$category = $_GET['category'] ?? '';
$limit = min((int)($_GET['limit'] ?? 20), 50);
$where = "WHERE deleted_at IS NULL";
$params = [];
$types = '';
if ($category) { $where .= " AND category = ?"; $params[] = $category; $types .= 's'; }

$sql = "SELECT id, title, slug, excerpt, category, image, featured, date_published, created_at FROM news $where ORDER BY date_published DESC LIMIT ?";
$params[] = $limit;
$types .= 'i';

$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

echo json_encode(['success' => true, 'data' => $result]);
