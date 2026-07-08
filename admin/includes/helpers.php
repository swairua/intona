<?php
function slugify(string $text): string {
  $text = preg_replace('~[^\pL\d]+~u', '-', $text);
  $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
  $text = preg_replace('~[^-\w]+~', '', $text);
  $text = trim($text, '-');
  $text = preg_replace('~-+~', '-', $text);
  $text = strtolower($text);
  return empty($text) ? 'n-a' : $text;
}

function uploadImage(array $file, string $subdir = 'general'): ?string {
  $allowed = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
  $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
  if (!in_array($ext, $allowed)) return null;
  if ($file['size'] > 10 * 1024 * 1024) return null;

  $dir = __DIR__ . "/../uploads/$subdir";
  if (!is_dir($dir)) mkdir($dir, 0755, true);

  $filename = uniqid() . '.' . $ext;
  $dest = "$dir/$filename";
  if (move_uploaded_file($file['tmp_name'], $dest)) {
    return "/intona/admin/uploads/$subdir/$filename";
  }
  return null;
}

function esc(string $text): string {
  return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}

function truncate(string $text, int $len = 100): string {
  return mb_strlen($text) > $len ? mb_substr($text, 0, $len) . '...' : $text;
}

function timeAgo(string $datetime): string {
  $ts = strtotime($datetime);
  $diff = time() - $ts;
  if ($diff < 60) return 'just now';
  if ($diff < 3600) return floor($diff / 60) . 'm ago';
  if ($diff < 86400) return floor($diff / 3600) . 'h ago';
  if ($diff < 604800) return floor($diff / 86400) . 'd ago';
  return date('M j, Y', $ts);
}

function exportCsv(array $rows, string $filename): void {
  header('Content-Type: text/csv; charset=utf-8');
  header("Content-Disposition: attachment; filename=\"$filename\"");
  $fp = fopen('php://output', 'w');
  if (!empty($rows)) {
    fputcsv($fp, array_keys($rows[0]));
    foreach ($rows as $row) {
      fputcsv($fp, $row);
    }
  }
  fclose($fp);
  exit;
}
