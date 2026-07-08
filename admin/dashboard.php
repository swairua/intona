<?php
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/schema.php';
require_once __DIR__ . '/includes/helpers.php';

runSchema();

$pageTitle = 'Dashboard';
include __DIR__ . '/includes/header.php';

$conn = getDb();

$stats = [
  'projects' => $conn->query("SELECT COUNT(*) as c FROM projects WHERE deleted_at IS NULL")->fetch_assoc()['c'],
  'active_projects' => $conn->query("SELECT COUNT(*) as c FROM projects WHERE status IN ('ongoing','planned') AND deleted_at IS NULL")->fetch_assoc()['c'],
  'services' => $conn->query("SELECT COUNT(*) as c FROM services WHERE deleted_at IS NULL")->fetch_assoc()['c'],
  'team' => $conn->query("SELECT COUNT(*) as c FROM team_members")->fetch_assoc()['c'],
  'testimonials' => $conn->query("SELECT COUNT(*) as c FROM testimonials WHERE active=1")->fetch_assoc()['c'],
  'unread_contacts' => $conn->query("SELECT COUNT(*) as c FROM contacts WHERE is_read=0")->fetch_assoc()['c'],
  'unread_quotations' => $conn->query("SELECT COUNT(*) as c FROM quotations WHERE is_read=0")->fetch_assoc()['c'],
  'applications' => $conn->query("SELECT COUNT(*) as c FROM career_applications")->fetch_assoc()['c'],
];

$recent = $conn->query("SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 10");

$monthly = $conn->query("
  SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as cnt
  FROM contacts GROUP BY month ORDER BY month DESC LIMIT 12
")->fetch_all(MYSQLI_ASSOC);
$monthly = array_reverse($monthly);

$statusData = $conn->query("
  SELECT status, COUNT(*) as cnt FROM projects WHERE deleted_at IS NULL GROUP BY status
")->fetch_all(MYSQLI_ASSOC);
?>

<div class="row g-4 mb-4">
  <div class="col-6 col-md-3">
    <div class="card stat-card">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <div class="text-muted small mb-1">Total Projects</div>
          <div class="stat-value"><?= $stats['projects'] ?></div>
        </div>
        <div class="stat-icon bg-primary-light"><i class="bi bi-building text-primary"></i></div>
      </div>
      <div class="mt-2"><span class="badge bg-warning-subtle text-warning-emphasis"><?= $stats['active_projects'] ?> active</span></div>
    </div>
  </div>
  <div class="col-6 col-md-3">
    <div class="card stat-card">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <div class="text-muted small mb-1">Services</div>
          <div class="stat-value"><?= $stats['services'] ?></div>
        </div>
        <div class="stat-icon bg-success-light"><i class="bi bi-grid text-success"></i></div>
      </div>
    </div>
  </div>
  <div class="col-6 col-md-3">
    <div class="card stat-card">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <div class="text-muted small mb-1">Team Members</div>
          <div class="stat-value"><?= $stats['team'] ?></div>
        </div>
        <div class="stat-icon bg-info-light"><i class="bi bi-people text-info"></i></div>
      </div>
    </div>
  </div>
  <div class="col-6 col-md-3">
    <div class="card stat-card">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <div class="text-muted small mb-1">Contact Inquiries</div>
          <div class="stat-value"><?= $stats['unread_contacts'] ?></div>
        </div>
        <div class="stat-icon bg-warning-light"><i class="bi bi-envelope text-warning"></i></div>
      </div>
      <div class="mt-2">
        <span class="badge bg-warning-subtle text-warning-emphasis"><?= $stats['unread_quotations'] ?> quotation requests</span>
      </div>
    </div>
  </div>
</div>

<div class="row g-4 mb-4">
  <div class="col-md-8">
    <div class="card">
      <div class="card-header">Monthly Inquiries</div>
      <div class="card-body">
        <canvas id="chartMonthly" height="220"></canvas>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-header">Project Status</div>
      <div class="card-body">
        <canvas id="chartStatus" height="220"></canvas>
      </div>
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header d-flex justify-content-between align-items-center">
    <span>Recent Activity</span>
    <a href="/intona/admin/activity-log/index.php" class="btn btn-sm btn-outline-primary">View All</a>
  </div>
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead>
          <tr><th>Action</th><th>Entity</th><th>Details</th><th>Time</th></tr>
        </thead>
        <tbody>
          <?php while ($row = $recent->fetch_assoc()): ?>
          <tr>
            <td><span class="badge bg-secondary"><?= esc($row['action']) ?></span></td>
            <td><?= esc($row['entity_type']) ?> #<?= $row['entity_id'] ?></td>
            <td class="text-muted small"><?= esc(truncate($row['details'] ?? '', 80)) ?></td>
            <td class="text-muted small"><?= timeAgo($row['created_at']) ?></td>
          </tr>
          <?php endwhile; ?>
          <?php if ($recent->num_rows === 0): ?>
          <tr><td colspan="4" class="text-center text-muted py-4">No activity yet</td></tr>
          <?php endif; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<script>
const months = <?= json_encode(array_column($monthly, 'month')) ?>;
const counts = <?= json_encode(array_column($monthly, 'cnt')) ?>;

const labels = months.map(m => { const d = new Date(m + '-01'); return d.toLocaleString('default',{month:'short',year:'2-digit'); });

new Chart(document.getElementById('chartMonthly'), {
  type: 'bar',
  data: { labels, datasets: [{ label: 'Inquiries', data: counts, backgroundColor: '#F68B2D', borderRadius: 6 }] },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
});

const statusLabels = <?= json_encode(array_column($statusData, 'status')) ?>;
const statusCounts = <?= json_encode(array_column($statusData, 'cnt')) ?>;
const colors = { planned: '#fbbf24', ongoing: '#3b82f6', completed: '#10b981', 'handed-over': '#8b5cf6' };

new Chart(document.getElementById('chartStatus'), {
  type: 'doughnut',
  data: { labels: statusLabels, datasets: [{ data: statusCounts, backgroundColor: statusLabels.map(s => colors[s] || '#6b7280') }] },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
});
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
