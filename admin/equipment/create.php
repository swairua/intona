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
    $name = trim($_POST['name'] ?? '');
    $slug = slugify($name) . '-' . uniqid();
    $description = $_POST['description'] ?? '';
    $availability = $_POST['availability'] ?? 'available';
    $sortOrder = (int)($_POST['sort_order'] ?? 0);
    $specs = [];

    $keys = $_POST['spec_key'] ?? [];
    $vals = $_POST['spec_value'] ?? [];
    for ($i = 0; $i < count($keys); $i++) {
      if (trim($keys[$i])) $specs[trim($keys[$i])] = trim($vals[$i] ?? '');
    }

    $image = null;
    if (!empty($_FILES['image']['name'])) $image = uploadImage($_FILES['image'], 'equipment');

    if (!$name) { $error = 'Name is required.'; }
    else {
      $specsJson = json_encode($specs);
      $stmt = $conn->prepare("INSERT INTO equipment (name, slug, description, image, specifications, availability, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)");
      $stmt->bind_param('ssssssi', $name, $slug, $description, $image, $specsJson, $availability, $sortOrder);
      if ($stmt->execute()) {
        logActivity('create', 'equipment', $stmt->insert_id, "Added equipment: $name");
        header('Location: /intona/admin/equipment/index.php');
        exit;
      }
      $error = $conn->error;
    }
  }
}

$pageTitle = 'New Equipment';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header">New Equipment</div>
  <div class="card-body">
    <?php if ($error): ?><div class="alert alert-danger"><?= esc($error) ?></div><?php endif; ?>
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Name *</label><input type="text" name="name" class="form-control" required></div>
        <div class="col-md-3"><label class="form-label">Availability</label>
          <select name="availability" class="form-select">
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div class="col-md-3"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="0"></div>
        <div class="col-12"><label class="form-label">Description</label><textarea name="description" class="form-control" rows="3"></textarea></div>
        <div class="col-md-6"><label class="form-label">Photo</label><input type="file" name="image" class="form-control" accept="image/*"></div>
        <div class="col-12">
          <label class="form-label">Specifications</label>
          <div id="specs">
            <div class="row g-2 mb-2">
              <div class="col-5"><input type="text" name="spec_key[]" class="form-control" placeholder="Engine Power"></div>
              <div class="col-5"><input type="text" name="spec_value[]" class="form-control" placeholder="410 HP"></div>
              <div class="col-2"><button type="button" class="btn btn-outline-success btn-sm" onclick="addSpec()"><i class="bi bi-plus"></i></button></div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Create</button>
          <a href="/intona/admin/equipment/index.php" class="btn btn-outline-secondary">Cancel</a>
        </div>
      </div>
    </form>
  </div>
</div>
<script>
function addSpec() {
  const div = document.createElement('div'); div.className = 'row g-2 mb-2';
  div.innerHTML = '<div class="col-5"><input type="text" name="spec_key[]" class="form-control" placeholder="Key"></div><div class="col-5"><input type="text" name="spec_value[]" class="form-control" placeholder="Value"></div><div class="col-2"><button type="button" class="btn btn-outline-danger btn-sm" onclick="this.closest(\'.row\').remove()"><i class="bi bi-x"></i></button></div>';
  document.getElementById('specs').appendChild(div);
}
</script>
<?php include __DIR__ . '/../includes/footer.php'; ?>
