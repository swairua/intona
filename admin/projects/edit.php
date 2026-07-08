<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$project = $conn->query("SELECT * FROM projects WHERE id = $id AND deleted_at IS NULL")->fetch_assoc();
if (!$project) { header('Location: /intona/admin/projects/index.php'); exit; }

$error = '';
$success = isset($_GET['success']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!verifyCsrf($_POST['csrf'] ?? '')) { $error = 'Invalid token.'; }
  else {
    $title = trim($_POST['title'] ?? '');
    $slug = slugify($title);
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
      $images = json_decode($project['images'] ?: '[]', true) ?: [];
      if (!empty($_FILES['images']['name'][0])) {
        foreach ($_FILES['images']['tmp_name'] as $i => $tmp) {
          if ($_FILES['images']['error'][$i] === UPLOAD_ERR_OK) {
            $file = ['name' => $_FILES['images']['name'][$i], 'tmp_name' => $tmp, 'size' => $_FILES['images']['size'][$i]];
            $path = uploadImage($file, 'projects');
            if ($path) $images[] = $path;
          }
        }
      }

      $stmt = $conn->prepare("UPDATE projects SET title=?, slug=?, description=?, category=?, location=?, client=?, budget=?, duration=?, status=?, technologies=?, images=?, featured=?, sort_order=? WHERE id=?");
      $imagesJson = json_encode($images);
      $stmt->bind_param('sssssssssssiii', $title, $slug, $description, $category, $location, $client, $budget, $duration, $status, $technologies, $imagesJson, $featured, $sortOrder, $id);

      if ($stmt->execute()) {
        logActivity('update', 'project', $id, "Updated project: $title");
        $success = true;
        $project = $conn->query("SELECT * FROM projects WHERE id = $id")->fetch_assoc();
      }
      $error = 'Database error: ' . $conn->error;
    }
  }
}

$pageTitle = 'Edit Project';
include __DIR__ . '/../includes/header.php';
$existingImages = json_decode($project['images'] ?: '[]', true) ?: [];
?>

<div class="card">
  <div class="card-header d-flex justify-content-between">
    <span>Edit Project</span>
    <a href="/intona/admin/projects/index.php" class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-left"></i> Back</a>
  </div>
  <div class="card-body">
    <?php if ($success): ?><div class="alert alert-success">Project saved successfully.</div><?php endif; ?>
    <?php if ($error): ?><div class="alert alert-danger"><?= esc($error) ?></div><?php endif; ?>
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-8">
          <label class="form-label">Title *</label>
          <input type="text" name="title" class="form-control" value="<?= esc($project['title']) ?>" required>
        </div>
        <div class="col-md-4">
          <label class="form-label">Category</label>
          <select name="category" class="form-select">
            <option value="">Select</option>
            <?php foreach (['Residential','Commercial','Industrial','Infrastructure','Roads','Schools','Hospitals'] as $c): ?>
            <option <?= $project['category'] === $c ? 'selected' : '' ?>><?= $c ?></option>
            <?php endforeach; ?>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Location</label>
          <input type="text" name="location" class="form-control" value="<?= esc($project['location']) ?>">
        </div>
        <div class="col-md-4">
          <label class="form-label">Client</label>
          <input type="text" name="client" class="form-control" value="<?= esc($project['client']) ?>">
        </div>
        <div class="col-md-2">
          <label class="form-label">Budget</label>
          <input type="text" name="budget" class="form-control" value="<?= esc($project['budget']) ?>">
        </div>
        <div class="col-md-2">
          <label class="form-label">Duration</label>
          <input type="text" name="duration" class="form-control" value="<?= esc($project['duration']) ?>">
        </div>
        <div class="col-md-4">
          <label class="form-label">Status</label>
          <select name="status" class="form-select">
            <?php foreach (['planned','ongoing','completed','handed-over'] as $s): ?>
            <option value="<?= $s ?>" <?= $project['status'] === $s ? 'selected' : '' ?>><?= ucfirst($s) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Sort Order</label>
          <input type="number" name="sort_order" class="form-control" value="<?= $project['sort_order'] ?>">
        </div>
        <div class="col-md-4 d-flex align-items-end">
          <div class="form-check">
            <input type="checkbox" name="featured" class="form-check-input" id="featured" <?= $project['featured'] ? 'checked' : '' ?>>
            <label class="form-check-label" for="featured">Featured project</label>
          </div>
        </div>
        <div class="col-12">
          <label class="form-label">Description</label>
          <textarea name="description" class="form-control tinymce" rows="6"><?= esc($project['description']) ?></textarea>
        </div>
        <div class="col-12">
          <label class="form-label">Technologies (comma separated)</label>
          <input type="text" name="technologies" class="form-control" value="<?= esc($project['technologies']) ?>">
        </div>
        <div class="col-12">
          <label class="form-label">Current Images</label>
          <div class="d-flex flex-wrap gap-2 mb-2">
            <?php foreach ($existingImages as $img): ?>
            <div class="position-relative">
              <img src="<?= $img ?>" class="image-preview">
            </div>
            <?php endforeach; ?>
            <?php if (empty($existingImages)): ?><span class="text-muted small">No images uploaded.</span><?php endif; ?>
          </div>
          <input type="file" name="images[]" class="form-control" multiple accept="image/*">
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Save Changes</button>
          <a href="/intona/admin/projects/index.php" class="btn btn-outline-secondary">Cancel</a>
        </div>
      </div>
    </form>
  </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
