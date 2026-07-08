<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'error' => 'Method not allowed']);
  exit;
}

$conn = getDb();

$firstName = trim($_POST['firstName'] ?? '');
$lastName = trim($_POST['lastName'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$coverLetter = trim($_POST['coverLetter'] ?? '');
$vacancyTitle = trim($_POST['vacancyTitle'] ?? '');

if (!$firstName || !$lastName || !$email) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Required fields missing.']);
  exit;
}

$cvPath = null;
if (!empty($_FILES['cv']['name'])) {
  $allowed = ['pdf', 'doc', 'docx'];
  $ext = strtolower(pathinfo($_FILES['cv']['name'], PATHINFO_EXTENSION));
  if (in_array($ext, $allowed) && $_FILES['cv']['size'] <= 10 * 1024 * 1024) {
    $dir = __DIR__ . '/../../admin/uploads/cvs';
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    $filename = uniqid() . '.' . $ext;
    if (move_uploaded_file($_FILES['cv']['tmp_name'], "$dir/$filename")) {
      $cvPath = "/intona/admin/uploads/cvs/$filename";
    }
  }
}

$stmt = $conn->prepare("INSERT INTO career_applications (first_name, last_name, email, phone, cover_letter, cv_path, vacancy_title) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param('sssssss', $firstName, $lastName, $email, $phone, $coverLetter, $cvPath, $vacancyTitle);

if ($stmt->execute()) {
  echo json_encode(['success' => true, 'message' => 'Application submitted successfully.']);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => 'Failed to submit application.']);
}
