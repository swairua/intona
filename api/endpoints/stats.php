<?php
$conn = getDb();

$response = [
  'yearsExperience' => (int)(date('Y') - 2010),
  'completedProjects' => (int)$conn->query("SELECT COUNT(*) as c FROM projects WHERE status IN ('completed','handed-over') AND deleted_at IS NULL")->fetch_assoc()['c'],
  'happyClients' => (int)$conn->query("SELECT COUNT(DISTINCT client) as c FROM projects WHERE client IS NOT NULL AND client != '' AND deleted_at IS NULL")->fetch_assoc()['c'],
  'engineers' => (int)$conn->query("SELECT COUNT(*) as c FROM team_members")->fetch_assoc()['c'],
  'currentProjects' => (int)$conn->query("SELECT COUNT(*) as c FROM projects WHERE status IN ('ongoing','planned') AND deleted_at IS NULL")->fetch_assoc()['c'],
];

echo json_encode(['success' => true, 'data' => $response]);
