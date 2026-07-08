<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$pageTitle = 'Career Applications';

if (isset($_GET['export'])) {
  $rows = $conn->query("SELECT * FROM career_applications ORDER BY created_at DESC")->fetch_all(MYSQLI_ASSOC);
  exportCsv($rows, 'applications-export.csv');
}

include __DIR__ . '/../includes/header.php';

$items = $conn->query("SELECT * FROM career_applications ORDER BY created_at DESC");
?>
<div class="d-flex justify-content-between align-items-center mb-3">
  <a href="?export=1" class="btn btn-sm btn-outline-success"><i class="bi bi-download"></i> Export CSV</a>
</div>

<div class="card">
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table datatable table-hover mb-0">
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Position</th><th>Date</th><th>CV</th><th>Actions</th></tr></thead>
        <tbody>
          <?php while ($a = $items->fetch_assoc()): ?>
          <tr>
            <td><?= $a['id'] ?></td>
            <td><?= esc($a['first_name']) ?> <?= esc($a['last_name']) ?></td>
            <td><a href="mailto:<?= esc($a['email']) ?>"><?= esc($a['email']) ?></a></td>
            <td><?= esc($a['phone']) ?></td>
            <td><?= esc($a['vacancy_title'] ?: '—') ?></td>
            <td class="text-nowrap"><?= date('M j, Y', strtotime($a['created_at'])) ?></td>
            <td>
              <?php if ($a['cv_path']): ?>
              <a href="<?= $a['cv_path'] ?>" target="_blank" class="btn btn-sm btn-outline-primary"><i class="bi bi-file-earmark-pdf"></i></a>
              <?php else: ?>
              —
              <?php endif; ?>
            </td>
            <td>
              <a href="/intona/admin/careers/view.php?id=<?= $a['id'] ?>" class="btn btn-sm btn-outline-info"><i class="bi bi-eye"></i></a>
              <a href="/intona/admin/careers/delete.php?id=<?= $a['id'] ?>" class="btn btn-sm btn-outline-danger" data-confirm="Delete?"><i class="bi bi-trash"></i></a>
            </td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
