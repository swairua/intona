<?php
defined('DB_HOST') or define('DB_HOST', 'localhost');
defined('DB_PORT') or define('DB_PORT', 3308);
defined('DB_USER') or define('DB_USER', 'root');
defined('DB_PASS') or define('DB_PASS', '');
defined('DB_NAME') or define('DB_NAME', 'intona');

if (!function_exists('getDb')) {
function getDb(): mysqli {
  static $conn = null;
  if ($conn === null) {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);
    if ($conn->connect_error) {
      http_response_code(500);
      echo json_encode(['success' => false, 'error' => 'Database connection failed']);
      exit;
    }
    $conn->set_charset('utf8mb4');
  }
  return $conn;
}
}
