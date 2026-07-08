<?php
$conn = getDb();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $id = $_GET['id'] ?? null;

  if ($id) {
    $stmt = $conn->prepare("SELECT * FROM projects WHERE id = ? AND deleted_at IS NULL");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    if ($result) {
      $result['technologies'] = $result['technologies'] ? array_map('trim', explode(',', $result['technologies'])) : [];
      $result['images'] = json_decode($result['images'] ?: '[]', true);
      echo json_encode(['success' => true, 'data' => $result]);
    } else {
      http_response_code(404);
      echo json_encode(['success' => false, 'error' => 'Project not found']);
    }
  } else {
    $category = $_GET['category'] ?? '';
    $status = $_GET['status'] ?? '';
    $featured = $_GET['featured'] ?? '';
    $limit = min((int)($_GET['limit'] ?? 100), 100);
    $offset = max((int)($_GET['offset'] ?? 0), 0);

    $where = "WHERE deleted_at IS NULL";
    $params = [];
    $types = '';
    if ($category) { $where .= " AND category = ?"; $params[] = $category; $types .= 's'; }
    if ($status) { $where .= " AND status = ?"; $params[] = $status; $types .= 's'; }
    if ($featured === '1') { $where .= " AND featured = 1"; }

    $sql = "SELECT * FROM projects $where ORDER BY featured DESC, sort_order ASC, created_at DESC LIMIT ? OFFSET ?";
    $params[] = $limit;
    $params[] = $offset;
    $types .= 'ii';

    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $projects = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    foreach ($projects as &$p) {
      $p['technologies'] = $p['technologies'] ? array_map('trim', explode(',', $p['technologies'])) : [];
      $p['images'] = json_decode($p['images'] ?: '[]', true);
    }

    echo json_encode(['success' => true, 'data' => $projects]);
  }
}
