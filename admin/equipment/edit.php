<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$item = $conn->query("SELECT * FROM equipment WHERE id = $id")->fetch_assoc();
if (!$item) { header('Location: /intona/admin/equipment/index.php'); exit; }

$specs = json_decode($item['specifications'] ?: '{}', true) ?: [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = trim($_POST['name'] ?? '');
  $description = $_POST['description'] ?? '';
  $availability = $_POST['availability'] ?? 'available';
  $sortOrder = (int)($_POST['sort_order'] ?? 0);
  $image = $item['image'];

  $keys = $_POST['spec_key'] ?? [];
  $vals = $_POST['spec_value'] ?? [];
  $newSpecs = [];
  for ($i = 0; $i < count($keys); $i++) {
    if (trim($keys[$i])) $newSpecs[trim($keys[$i])] = trim($vals[$i] ?? '');
  }
  if (!empty($_FILES['image']['name'])) { $img = uploadImage($_FILES['image'], 'equipment'); if ($img) $image = $img; }

  if ($name) {
    $specsJson = json_encode($newSpecs);
    $stmt = $conn->prepare("UPDATE equipment SET name=?, description=?, image=?, specifications=?, availability=?, sort_order=? WHERE id=?");
    $stmt->bind_param('sssssii', $name, $description, $image, $specsJson, $availability, $sortOrder, $id);
    $stmt->execute();
    logActivity('update', 'equipment', $id, "Updated equipment: $name");
    header('Location: /intona/admin/equipment/index.php'); exit;
  }
}

$pageTitle = 'Edit Equipment';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header d-flex justify-content-between">
    <span>Edit Equipment</span>
    <a href="/intona/admin/equipment/index.php" class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-left"></i> Back</a>
  </div>
  <div class="card-body">
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
      <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Name *</label><input type="text" name="name" class="form-control" value="<?= esc($item['name']) ?>" required></div>
        <div class="col-md-3">
          <label class="form-label">Availability</label>
          <select name="availability" class="form-select">
            <?php foreach (['available','rented','maintenance'] as $a): ?>
            <option value="<?= $a ?>" <?= $item['availability'] === $a ? 'selected' : '' ?>><?= ucfirst($a) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
        <div class="col-md-3"><label class="form-label">Sort Order</label><input type="number" name="sort_order" class="form-control" value="<?= $item['sort_order'] ?>"></div>
        <div class="col-12"><label class="form-label">Description</label><textarea name="description" class="form-control" rows="3"><?= esc($item['description']) ?></textarea></div>
        <div class="col-md-6">
          <label class="form-label">Photo</label>
          <?php if ($item['image']): ?><div class="mb-2"><img src="<?= $item['image'] ?>" class="image-preview"></div><?php endif; ?>
          <input type="file" name="image" class="form-control" accept="image/*">
        </div>
        <div class="col-12">
          <label class="form-label">Specifications</label>
          <div id="specs">
            <?php if (!empty($specs)): ?>
              <?php foreach ($specs as $k => $v): ?>
              <div class="row g-2 mb-2">
                <div class="col-5"><input type="text" name="spec_key[]" class="form-control" value="<?= esc($k) ?>"></div>
                <div class="col-5"><input type="text" name="spec_value[]" class="form-control" value="<?= esc($v) ?>"></div>
                <div class="col-2"><button type="button" class="btn btn-outline-danger btn-sm" onclick="this.closest('.row').remove()"><i class="bi bi-x"></i></button></div>
              </div>
              <?php endforeach; ?>
            <?php else: ?>
            <div class="row g-2 mb-2">
              <div class="col-5"><input type="text" name="spec_key[]" class="form-control" placeholder="Key"></div>
              <div class="col-5"><input type="text" name="spec_value[]" class="form-control" placeholder="Value"></div>
              <div class="col-2"><button type="button" class="btn btn-outline-success btn-sm" onclick="addSpec()"><i class="bi bi-plus"></i></button></div>
            </div>
            <?php endif; ?>
          </div>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Save</button>
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
