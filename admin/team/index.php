<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$pageTitle = 'Team';
include __DIR__ . '/../includes/header.php';

$conn = getDb();
$items = $conn->query("SELECT * FROM team_members ORDER BY sort_order ASC");
?>
<div class="d-flex justify-content-between align-items-center mb-3">
  <a href="/intona/admin/team/create.php" class="btn btn-primary"><i class="bi bi-plus-lg"></i> New Member</a>
</div>
<div class="card">
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table datatable table-hover mb-0">
        <thead><tr><th>ID</th><th>Name</th><th>Role</th><th>Photo</th><th>Actions</th></tr></thead>
        <tbody>
          <?php while ($m = $items->fetch_assoc()): ?>
          <tr>
            <td><?= $m['id'] ?></td>
            <td><strong><?= esc($m['name']) ?></strong></td>
            <td><?= esc($m['role']) ?></td>
            <td><?= $m['image'] ? '<img src="'.$m['image'].'" class="image-preview">' : '-' ?></td>
            <td>
              <a href="/intona/admin/team/edit.php?id=<?= $m['id'] ?>" class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></a>
              <a href="/intona/admin/team/delete.php?id=<?= $m['id'] ?>" class="btn btn-sm btn-outline-danger" data-confirm="Delete?"><i class="bi bi-trash"></i></a>
            </td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
