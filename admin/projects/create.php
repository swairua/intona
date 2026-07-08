<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!verifyCsrf($_POST['csrf'] ?? '')) { $error = 'Invalid token.'; }
  else {
    $title = trim($_POST['title'] ?? '');
    $slug = slugify($title) . '-' . uniqid();
    $description = $_POST['description'] ?? '';
    $category = $_POST['category'] ?? '';
    $location = $_POST['location'] ?? '';
    $client = $_POST['client'] ?? '';
    $budget = $_POST['budget'] ?? '';
    $duration = $_POST['duration'] ?? '';
    $status = $_POST['status'] ?? 'planned';
    $technologies = $_POST['technologies'] ?? '';
    $featured = isset($_POST['featured']) ? 1 : 0;
    $sortOrder = (int)($_POST['sort_order'] ?? 0);

    if (!$title) { $error = 'Title is required.'; }
    else {
      $images = [];
      if (!empty($_FILES['images']['name'][0])) {
        foreach ($_FILES['images']['tmp_name'] as $i => $tmp) {
          if ($_FILES['images']['error'][$i] === UPLOAD_ERR_OK) {
            $file = ['name' => $_FILES['images']['name'][$i], 'tmp_name' => $tmp, 'size' => $_FILES['images']['size'][$i]];
            $path = uploadImage($file, 'projects');
            if ($path) $images[] = $path;
          }
        }
      }

      $stmt = $conn->prepare("INSERT INTO projects (title, slug, description, category, location, client, budget, duration, status, technologies, images, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
      $imagesJson = json_encode($images);
      $stmt->bind_param('sssssssssssis', $title, $slug, $description, $category, $location, $client, $budget, $duration, $status, $technologies, $imagesJson, $featured, $sortOrder);

      if ($stmt->execute()) {
        $id = $stmt->insert_id;
        logActivity('create', 'project', $id, "Created project: $title");
        $success = 'Project created.';
        echo "<script>location.href='/intona/admin/projects/edit.php?id=$id&success=1';</script>";
        exit;
      }
      $error = 'Database error: ' . $conn->error;
    }
  }
}

$pageTitle = 'New Project';
include __DIR__ . '/../includes/header.php';
?>

<div class="card">
  <div class="card-header">New Project</div>
  <div class="card-body">
    <?php if ($error): ?><div class="alert alert-danger"><?= esc($error) ?></div><?php endif; ?>
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-8">
          <label class="form-label">Title *</label>
          <input type="text" name="title" class="form-control" required>
        </div>
        <div class="col-md-4">
          <label class="form-label">Category</label>
          <select name="category" class="form-select">
            <option value="">Select</option>
            <option>Residential</option><option>Commercial</option><option>Industrial</option>
            <option>Infrastructure</option><option>Roads</option><option>Schools</option><option>Hospitals</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Location</label>
          <input type="text" name="location" class="form-control">
        </div>
        <div class="col-md-4">
          <label class="form-label">Client</label>
          <input type="text" name="client" class="form-control">
        </div>
        <div class="col-md-2">
          <label class="form-label">Budget</label>
          <input type="text" name="budget" class="form-control" placeholder="$50M">
        </div>
        <div class="col-md-2">
          <label class="form-label">Duration</label>
          <input type="text" name="duration" class="form-control" placeholder="18 months">
        </div>
        <div class="col-md-4">
          <label class="form-label">Status</label>
          <select name="status" class="form-select">
            <option value="planned">Planned</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="handed-over">Handed Over</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Sort Order</label>
          <input type="number" name="sort_order" class="form-control" value="0">
        </div>
        <div class="col-md-4 d-flex align-items-end">
          <div class="form-check">
            <input type="checkbox" name="featured" class="form-check-input" id="featured">
            <label class="form-check-label" for="featured">Featured project</label>
          </div>
        </div>
        <div class="col-12">
          <label class="form-label">Description</label>
          <textarea name="description" class="form-control tinymce" rows="6"></textarea>
        </div>
        <div class="col-12">
          <label class="form-label">Technologies (comma separated)</label>
          <input type="text" name="technologies" class="form-control" placeholder="Reinforced Concrete, Steel Structure, Smart Systems">
        </div>
        <div class="col-12">
          <label class="form-label">Images</label>
          <input type="file" name="images[]" class="form-control" multiple accept="image/*">
          <div class="form-text">PNG, JPG, WebP up to 10MB each.</div>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Create Project</button>
          <a href="/intona/admin/projects/index.php" class="btn btn-outline-secondary">Cancel</a>
        </div>
      </div>
    </form>
  </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
