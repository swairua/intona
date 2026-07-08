<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$pageTitle = 'Services';
include __DIR__ . '/../includes/header.php';

$conn = getDb();
$services = $conn->query("SELECT s.* FROM services s WHERE s.deleted_at IS NULL ORDER BY s.sort_order ASC");

$categories = $conn->query("SELECT DISTINCT category FROM services WHERE deleted_at IS NULL AND category IS NOT NULL AND category != ''");
?>

<div class="d-flex justify-content-between align-items-center mb-3">
  <a href="/intona/admin/services/create.php" class="btn btn-primary"><i class="bi bi-plus-lg"></i> New Service</a>
</div>

<div class="card">
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table datatable table-hover mb-0">
        <thead><tr><th>ID</th><th>Title</th><th>Category</th><th>Icon</th><th>Order</th><th>Actions</th></tr></thead>
        <tbody>
          <?php while ($s = $services->fetch_assoc()): ?>
          <tr>
            <td><?= $s['id'] ?></td>
            <td><strong><?= esc($s['title']) ?></strong></td>
            <td><span class="badge bg-primary-subtle text-primary-emphasis"><?= esc($s['category']) ?></span></td>
            <td><?= esc($s['icon']) ?></td>
            <td><?= $s['sort_order'] ?></td>
            <td>
              <a href="/intona/admin/services/edit.php?id=<?= $s['id'] ?>" class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></a>
              <a href="/intona/admin/services/delete.php?id=<?= $s['id'] ?>" class="btn btn-sm btn-outline-danger" data-confirm="Delete this service?"><i class="bi bi-trash"></i></a>
            </td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
