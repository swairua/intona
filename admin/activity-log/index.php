<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$pageTitle = 'Activity Log';

$entity = $_GET['entity'] ?? '';
$action = $_GET['action'] ?? '';
$where = 'WHERE 1=1';
$params = [];
$types = '';
if ($entity) { $where .= " AND al.entity_type = ?"; $params[] = $entity; $types .= 's'; }
if ($action) { $where .= " AND al.action = ?"; $params[] = $action; $types .= 's'; }

$sql = "SELECT al.*, au.name as admin_name FROM activity_log al LEFT JOIN admin_users au ON al.admin_id = au.id $where ORDER BY al.created_at DESC LIMIT 500";
$stmt = $conn->prepare($sql);
if ($params) $stmt->bind_param($types, ...$params);
$stmt->execute();
$items = $stmt->get_result();

include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header">
    <form method="get" class="d-flex gap-2 flex-wrap">
      <select name="entity" class="form-select form-select-sm" style="width:auto">
        <option value="">All Entities</option>
        <?php foreach (['project','service','team','equipment','testimonial','gallery','news','contact','quotation','application','settings','admin_user'] as $e): ?>
        <option value="<?= $e ?>" <?= $entity === $e ? 'selected' : '' ?>><?= ucfirst($e) ?></option>
        <?php endforeach; ?>
      </select>
      <select name="action" class="form-select form-select-sm" style="width:auto">
        <option value="">All Actions</option>
        <?php foreach (['create','update','delete','login'] as $a): ?>
        <option value="<?= $a ?>" <?= $action === $a ? 'selected' : '' ?>><?= ucfirst($a) ?></option>
        <?php endforeach; ?>
      </select>
      <button type="submit" class="btn btn-sm btn-primary">Filter</button>
    </form>
  </div>
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead><tr><th>Time</th><th>Admin</th><th>Action</th><th>Entity</th><th>Details</th><th>IP</th></tr></thead>
        <tbody>
          <?php while ($log = $items->fetch_assoc()): ?>
          <tr>
            <td class="text-nowrap small"><?= date('M j, Y g:i a', strtotime($log['created_at'])) ?></td>
            <td><?= esc($log['admin_name'] ?: '—') ?></td>
            <td><span class="badge <?= match($log['action']) { 'create' => 'bg-success', 'update' => 'bg-info', 'delete' => 'bg-danger', default => 'bg-secondary' } ?>"><?= $log['action'] ?></span></td>
            <td><?= esc($log['entity_type']) ?> <?= $log['entity_id'] ? '#' . $log['entity_id'] : '' ?></td>
            <td class="small text-muted"><?= esc(truncate($log['details'] ?? '', 120)) ?></td>
            <td class="small text-muted"><?= $log['ip_address'] ?></td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
