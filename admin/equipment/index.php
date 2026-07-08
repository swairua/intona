<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$pageTitle = 'Equipment';
include __DIR__ . '/../includes/header.php';

$conn = getDb();
$items = $conn->query("SELECT * FROM equipment ORDER BY sort_order ASC");
?>
<div class="d-flex justify-content-between align-items-center mb-3">
  <a href="/intona/admin/equipment/create.php" class="btn btn-primary"><i class="bi bi-plus-lg"></i> New Equipment</a>
</div>
<div class="card">
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table datatable table-hover mb-0">
        <thead><tr><th>ID</th><th>Name</th><th>Availability</th><th>Photo</th><th>Actions</th></tr></thead>
        <tbody>
          <?php while ($e = $items->fetch_assoc()): ?>
          <tr>
            <td><?= $e['id'] ?></td>
            <td><strong><?= esc($e['name']) ?></strong></td>
            <td><span class="badge badge-<?= $e['availability'] ?>"><?= $e['availability'] ?></span></td>
            <td><?= $e['image'] ? '<img src="'.$e['image'].'" class="image-preview">' : '-' ?></td>
            <td>
              <a href="/intona/admin/equipment/edit.php?id=<?= $e['id'] ?>" class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></a>
              <a href="/intona/admin/equipment/delete.php?id=<?= $e['id'] ?>" class="btn btn-sm btn-outline-danger" data-confirm="Delete?"><i class="bi bi-trash"></i></a>
            </td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
