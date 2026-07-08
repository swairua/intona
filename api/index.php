<?php
require_once __DIR__ . '/middleware/cors.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/../admin/config/schema.php';
runSchema();

$route = $_GET['route'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

$routes = [
  'stats' => 'stats.php',
  'projects' => 'projects.php',
  'services' => 'services.php',
  'team' => 'team.php',
  'equipment' => 'equipment.php',
  'testimonials' => 'testimonials.php',
  'gallery' => 'gallery.php',
  'news' => 'news.php',
  'contact' => 'contact.php',
  'quotation' => 'quotation.php',
  'careers' => 'careers.php',
];

$base = explode('?', $route)[0];
$base = rtrim($base, '/');

if (isset($routes[$base])) {
  require __DIR__ . '/endpoints/' . $routes[$base];
} else {
  http_response_code(404);
  echo json_encode(['success' => false, 'error' => 'Endpoint not found']);
}
