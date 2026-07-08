<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!verifyCsrf($_POST['csrf'] ?? '')) { $error = 'Invalid token.'; }
  else {
    $title = trim($_POST['title'] ?? '');
    $slug = slugify($title) . '-' . uniqid();
    $excerpt = $_POST['excerpt'] ?? '';
    $content = $_POST['content'] ?? '';
    $category = $_POST['category'] ?? '';
    $datePublished = $_POST['date_published'] ?? date('Y-m-d');
    $featured = isset($_POST['featured']) ? 1 : 0;
    $image = null;
    if (!empty($_FILES['image']['name'])) $image = uploadImage($_FILES['image'], 'general');
    if (!$title) { $error = 'Title is required.'; }
    else {
      $stmt = $conn->prepare("INSERT INTO news (title, slug, excerpt, content, category, image, featured, date_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
      $stmt->bind_param('ssssssis', $title, $slug, $excerpt, $content, $category, $image, $featured, $datePublished);
      $stmt->execute();
      logActivity('create', 'news', $stmt->insert_id, "Created article: $title");
      header('Location: /intona/admin/news/index.php'); exit;
    }
  }
}

$pageTitle = 'New Article';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header">New Article</div>
  <div class="card-body">
    <?php if ($error): ?><div class="alert alert-danger"><?= esc($error) ?></div><?php endif; ?>
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-8"><label class="form-label">Title *</label><input type="text" name="title" class="form-control" required></div>
        <div class="col-md-2"><label class="form-label">Category</label>
          <select name="category" class="form-select"><option>Projects</option><option>Safety</option><option>Sustainability</option><option>Awards</option><option>Equipment</option><option>CSR</option><option>Company</option></select>
        </div>
        <div class="col-md-2"><label class="form-label">Date</label><input type="text" name="date_published" class="form-control datepicker" value="<?= date('Y-m-d') ?>"></div>
        <div class="col-md-6"><label class="form-label">Image</label><input type="file" name="image" class="form-control" accept="image/*"></div>
        <div class="col-md-6 d-flex align-items-end">
          <div class="form-check"><input type="checkbox" name="featured" class="form-check-input" id="featured"><label class="form-check-label" for="featured">Featured article</label></div>
        </div>
        <div class="col-12"><label class="form-label">Excerpt</label><textarea name="excerpt" class="form-control" rows="2"></textarea></div>
        <div class="col-12"><label class="form-label">Content</label><textarea name="content" class="form-control tinymce" rows="10"></textarea></div>
        <div class="col-12"><button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Create</button><a href="/intona/admin/news/index.php" class="btn btn-outline-secondary ms-2">Cancel</a></div>
      </div>
    </form>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
