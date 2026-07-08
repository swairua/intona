<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'error' => 'Method not allowed']);
  exit;
}

$conn = getDb();
$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

if (!$name || !$email || !$message) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Name, email and message are required.']);
  exit;
}

$stmt = $conn->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param('ssss', $name, $email, $subject, $message);

if ($stmt->execute()) {
  echo json_encode(['success' => true, 'message' => 'Message sent successfully. We will get back to you within 24 hours.']);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => 'Failed to send message.']);
}
