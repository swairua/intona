<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$item = $conn->query("SELECT * FROM news WHERE id = $id AND deleted_at IS NULL")->fetch_assoc();
if (!$item) { header('Location: /intona/admin/news/index.php'); exit; }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $title = trim($_POST['title'] ?? '');
  $excerpt = $_POST['excerpt'] ?? '';
  $content = $_POST['content'] ?? '';
  $category = $_POST['category'] ?? '';
  $datePublished = $_POST['date_published'] ?? date('Y-m-d');
  $featured = isset($_POST['featured']) ? 1 : 0;
  $image = $item['image'];
  if (!empty($_FILES['image']['name'])) { $img = uploadImage($_FILES['image'], 'general'); if ($img) $image = $img; }
  if ($title) {
    $stmt = $conn->prepare("UPDATE news SET title=?, excerpt=?, content=?, category=?, image=?, featured=?, date_published=? WHERE id=?");
    $stmt->bind_param('sssssisi', $title, $excerpt, $content, $category, $image, $featured, $datePublished, $id);
    $stmt->execute();
    logActivity('update', 'news', $id, "Updated article: $title");
    header('Location: /intona/admin/news/index.php'); exit;
  }
}

$pageTitle = 'Edit Article';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header d-flex justify-content-between">
    <span>Edit Article</span>
    <a href="/intona/admin/news/index.php" class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-left"></i> Back</a>
  </div>
  <div class="card-body">
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-8"><label class="form-label">Title *</label><input type="text" name="title" class="form-control" value="<?= esc($item['title']) ?>" required></div>
        <div class="col-md-2"><label class="form-label">Category</label>
          <select name="category" class="form-select">
            <?php foreach (['Projects','Safety','Sustainability','Awards','Equipment','CSR','Company'] as $c): ?>
            <option <?= $item['category'] === $c ? 'selected' : '' ?>><?= $c ?></option>
            <?php endforeach; ?>
          </select>
        </div>
        <div class="col-md-2"><label class="form-label">Date</label><input type="text" name="date_published" class="form-control datepicker" value="<?= $item['date_published'] ?>"></div>
        <div class="col-md-6">
          <label class="form-label">Image</label>
          <?php if ($item['image']): ?><div class="mb-2"><img src="<?= $item['image'] ?>" class="image-preview"></div><?php endif; ?>
          <input type="file" name="image" class="form-control" accept="image/*">
        </div>
        <div class="col-md-6 d-flex align-items-end">
          <div class="form-check"><input type="checkbox" name="featured" class="form-check-input" id="featured" <?=$item['featured']?'checked':''?>><label class="form-check-label" for="featured">Featured</label></div>
        </div>
        <div class="col-12"><label class="form-label">Excerpt</label><textarea name="excerpt" class="form-control" rows="2"><?= esc($item['excerpt']) ?></textarea></div>
        <div class="col-12"><label class="form-label">Content</label><textarea name="content" class="form-control tinymce" rows="10"><?= esc($item['content']) ?></textarea></div>
        <div class="col-12"><button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Save</button><a href="/intona/admin/news/index.php" class="btn btn-outline-secondary ms-2">Cancel</a></div>
      </div>
    </form>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
