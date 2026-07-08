<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$pageTitle = 'Testimonials';
include __DIR__ . '/../includes/header.php';

$conn = getDb();
$items = $conn->query("SELECT * FROM testimonials ORDER BY sort_order ASC");
?>
<div class="d-flex justify-content-between align-items-center mb-3">
  <a href="/intona/admin/testimonials/create.php" class="btn btn-primary"><i class="bi bi-plus-lg"></i> New Testimonial</a>
</div>
<div class="card">
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table datatable table-hover mb-0">
        <thead><tr><th>ID</th><th>Name</th><th>Company</th><th>Rating</th><th>Active</th><th>Actions</th></tr></thead>
        <tbody>
          <?php while ($t = $items->fetch_assoc()): ?>
          <tr>
            <td><?= $t['id'] ?></td>
            <td><strong><?= esc($t['name']) ?></strong></td>
            <td><?= esc($t['company']) ?></td>
            <td><?= str_repeat('⭐', $t['rating']) ?></td>
            <td><?= $t['active'] ? '<span class="badge bg-success">Active</span>' : '<span class="badge bg-secondary">Inactive</span>' ?></td>
            <td>
              <a href="/intona/admin/testimonials/edit.php?id=<?= $t['id'] ?>" class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></a>
              <a href="/intona/admin/testimonials/delete.php?id=<?= $t['id'] ?>" class="btn btn-sm btn-outline-danger" data-confirm="Delete?"><i class="bi bi-trash"></i></a>
            </td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
