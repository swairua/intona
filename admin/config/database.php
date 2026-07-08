<?php
define('DB_HOST', 'localhost');
define('DB_PORT', 3308);
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'intona');

function getDb(): mysqli {
  static $conn = null;
  if ($conn === null) {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);
    if ($conn->connect_error) {
      die(json_encode(['success' => false, 'error' => 'Database connection failed: ' . $conn->connect_error]));
    }
    $conn->set_charset('utf8mb4');
  }
  return $conn;
}
