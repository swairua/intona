<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$pageTitle = 'News';
include __DIR__ . '/../includes/header.php';

$conn = getDb();
$items = $conn->query("SELECT * FROM news WHERE deleted_at IS NULL ORDER BY date_published DESC");
?>
<div class="d-flex justify-content-between align-items-center mb-3">
  <a href="/intona/admin/news/create.php" class="btn btn-primary"><i class="bi bi-plus-lg"></i> New Article</a>
</div>
<div class="card">
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table datatable table-hover mb-0">
        <thead><tr><th>ID</th><th>Title</th><th>Category</th><th>Date</th><th>Featured</th><th>Actions</th></tr></thead>
        <tbody>
          <?php while ($n = $items->fetch_assoc()): ?>
          <tr>
            <td><?= $n['id'] ?></td>
            <td><strong><?= esc($n['title']) ?></strong></td>
            <td><span class="badge bg-primary-subtle text-primary-emphasis"><?= esc($n['category']) ?></span></td>
            <td><?= $n['date_published'] ?></td>
            <td><?= $n['featured'] ? '<i class="bi bi-star-fill text-warning"></i>' : '' ?></td>
            <td>
              <a href="/intona/admin/news/edit.php?id=<?= $n['id'] ?>" class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></a>
              <a href="/intona/admin/news/delete.php?id=<?= $n['id'] ?>" class="btn btn-sm btn-outline-danger" data-confirm="Delete?"><i class="bi bi-trash"></i></a>
            </td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
