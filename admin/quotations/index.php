<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$pageTitle = 'Quotation Requests';

if (isset($_GET['read']) && $id = (int)$_GET['read']) $conn->query("UPDATE quotations SET is_read=1 WHERE id=$id");
if (isset($_GET['export'])) {
  $rows = $conn->query("SELECT * FROM quotations ORDER BY created_at DESC")->fetch_all(MYSQLI_ASSOC);
  exportCsv($rows, 'quotations-export.csv');
}

include __DIR__ . '/../includes/header.php';

$filter = isset($_GET['filter']) && $_GET['filter'] === 'unread' ? 'WHERE is_read=0' : '';
$items = $conn->query("SELECT * FROM quotations $filter ORDER BY created_at DESC");
?>
<div class="d-flex justify-content-between align-items-center mb-3">
  <div class="d-flex gap-2">
    <a href="?filter=all" class="btn btn-sm <?= !isset($_GET['filter']) || $_GET['filter'] === 'all' ? 'btn-primary' : 'btn-outline-secondary' ?>">All</a>
    <a href="?filter=unread" class="btn btn-sm <?= ($_GET['filter'] ?? '') === 'unread' ? 'btn-primary' : 'btn-outline-secondary' ?>">Unread</a>
  </div>
  <a href="?export=1" class="btn btn-sm btn-outline-success"><i class="bi bi-download"></i> Export CSV</a>
</div>

<div class="card">
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table datatable table-hover mb-0">
        <thead><tr><th>ID</th><th>Name</th><th>Company</th><th>Project Type</th><th>Budget</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <?php while ($q = $items->fetch_assoc()): ?>
          <tr class="<?= !$q['is_read'] ? 'fw-bold' : '' ?>">
            <td><?= $q['id'] ?></td>
            <td><?= esc($q['name']) ?></td>
            <td><?= esc($q['company'] ?: '—') ?></td>
            <td><?= esc($q['project_type']) ?></td>
            <td><?= esc($q['budget']) ?></td>
            <td class="text-nowrap"><?= date('M j, Y', strtotime($q['created_at'])) ?></td>
            <td><?= $q['is_read'] ? '<span class="badge bg-success">Read</span>' : '<span class="badge bg-warning">New</span>' ?></td>
            <td class="text-nowrap">
              <a href="/intona/admin/quotations/view.php?id=<?= $q['id'] ?>" class="btn btn-sm btn-outline-info"><i class="bi bi-eye"></i></a>
              <?php if (!$q['is_read']): ?><a href="?read=<?= $q['id'] ?>" class="btn btn-sm btn-outline-success"><i class="bi bi-check2"></i></a><?php endif; ?>
              <a href="/intona/admin/quotations/delete.php?id=<?= $q['id'] ?>" class="btn btn-sm btn-outline-danger" data-confirm="Delete?"><i class="bi bi-trash"></i></a>
            </td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
