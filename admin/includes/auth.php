<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

function isAuthenticated(): bool {
  return !empty($_SESSION['admin_id']);
}

function requireAuth(): void {
  if (!isAuthenticated()) {
    header('Location: /intona/admin/login.php');
    exit;
  }
}

function csrfToken(): string {
  if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
  }
  return $_SESSION['csrf_token'];
}

function verifyCsrf(string $token): bool {
  return !empty($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

function logActivity(string $action, string $entityType, ?int $entityId = null, ?string $details = null): void {
  $conn = getDb();
  $adminId = $_SESSION['admin_id'] ?? null;
  $ip = $_SERVER['REMOTE_ADDR'] ?? null;
  $stmt = $conn->prepare("INSERT INTO activity_log (admin_id, action, entity_type, entity_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)");
  $stmt->bind_param('ississ', $adminId, $action, $entityType, $entityId, $details, $ip);
  $stmt->execute();
}
