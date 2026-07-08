<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$pageTitle = 'Gallery';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['upload'])) {
  if (verifyCsrf($_POST['csrf'] ?? '')) {
    $title = $_POST['title'] ?? '';
    $category = $_POST['category'] ?? '';
    $sortOrder = (int)($_POST['sort_order'] ?? 0);
    if (!empty($_FILES['image']['name'])) {
      $path = uploadImage($_FILES['image'], 'gallery');
      if ($path) {
        $stmt = $conn->prepare("INSERT INTO gallery (title, image, category, sort_order) VALUES (?, ?, ?, ?)");
        $stmt->bind_param('sssi', $title, $path, $category, $sortOrder);
        $stmt->execute();
        logActivity('create', 'gallery', $stmt->insert_id, "Uploaded image: $title");
      }
    }
  }
}

$items = $conn->query("SELECT * FROM gallery ORDER BY sort_order ASC, created_at DESC");
$categories = $conn->query("SELECT DISTINCT category FROM gallery WHERE category IS NOT NULL AND category != ''");

include __DIR__ . '/../includes/header.php';
?>
<div class="card mb-4">
  <div class="card-header">Upload Image</div>
  <div class="card-body">
    <form method="post" enctype="multipart/form-data" class="row g-3">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <input type="hidden" name="upload" value="1">
      <div class="col-md-4"><input type="text" name="title" class="form-control" placeholder="Image title"></div>
      <div class="col-md-3">
        <select name="category" class="form-select">
          <option value="">Category</option>
          <option>Infrastructure</option><option>Commercial</option><option>Residential</option><option>Industrial</option><option>Equipment</option><option>Events</option>
        </select>
      </div>
      <div class="col-md-2"><input type="number" name="sort_order" class="form-control" placeholder="Order" value="0"></div>
      <div class="col-md-3"><input type="file" name="image" class="form-control" required accept="image/*"></div>
      <div class="col-12"><button type="submit" class="btn btn-primary"><i class="bi bi-upload"></i> Upload</button></div>
    </form>
  </div>
</div>

<div class="card">
  <div class="card-header">Gallery Images</div>
  <div class="card-body">
    <div class="row g-3">
      <?php while ($g = $items->fetch_assoc()): ?>
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card">
          <img src="<?= $g['image'] ?>" class="card-img-top" style="height:180px;object-fit:cover" alt="<?= esc($g['title']) ?>">
          <div class="card-body p-2">
            <p class="small mb-1 fw-medium"><?= esc($g['title'] ?: 'Untitled') ?></p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="badge bg-secondary"><?= esc($g['category']) ?></span>
              <a href="/intona/admin/gallery/delete.php?id=<?= $g['id'] ?>" class="btn btn-sm btn-outline-danger" data-confirm="Delete this image?"><i class="bi bi-trash"></i></a>
            </div>
          </div>
        </div>
      </div>
      <?php endwhile; ?>
    </div>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
