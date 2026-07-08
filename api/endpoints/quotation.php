<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'error' => 'Method not allowed']);
  exit;
}

$conn = getDb();
$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$name = trim($input['name'] ?? '');
$company = trim($input['company'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$projectType = trim($input['projectType'] ?? '');
$budget = trim($input['budget'] ?? '');
$timeline = trim($input['timeline'] ?? '');
$description = trim($input['description'] ?? '');

if (!$name || !$email || !$phone || !$description) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Required fields missing.']);
  exit;
}

$stmt = $conn->prepare("INSERT INTO quotations (name, company, email, phone, project_type, budget, timeline, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param('ssssssss', $name, $company, $email, $phone, $projectType, $budget, $timeline, $description);

if ($stmt->execute()) {
  echo json_encode(['success' => true, 'message' => 'Quotation request submitted. Our team will contact you within 24 hours.']);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => 'Failed to submit request.']);
}
