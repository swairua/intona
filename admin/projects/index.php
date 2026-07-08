<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$pageTitle = 'Projects';
include __DIR__ . '/../includes/header.php';

$conn = getDb();
$category = $_GET['category'] ?? '';
$status = $_GET['status'] ?? '';
$where = "WHERE p.deleted_at IS NULL";
$params = [];
$types = '';

if ($category) { $where .= " AND p.category = ?"; $params[] = $category; $types .= 's'; }
if ($status) { $where .= " AND p.status = ?"; $params[] = $status; $types .= 's'; }

$sql = "SELECT p.* FROM projects p $where ORDER BY p.sort_order ASC, p.created_at DESC";
$stmt = $conn->prepare($sql);
if ($params) $stmt->bind_param($types, ...$params);
$stmt->execute();
$projects = $stmt->get_result();

$categories = $conn->query("SELECT DISTINCT category FROM projects WHERE deleted_at IS NULL AND category IS NOT NULL AND category != ''");
?>

<div class="d-flex justify-content-between align-items-center mb-3">
  <div class="d-flex gap-2">
    <form method="get" class="d-flex gap-2">
      <select name="category" class="form-select form-select-sm" style="width:auto" onchange="this.form.submit()">
        <option value="">All Categories</option>
        <?php while ($c = $categories->fetch_assoc()): ?>
        <option value="<?= esc($c['category']) ?>" <?= $category === $c['category'] ? 'selected' : '' ?>><?= esc($c['category']) ?></option>
        <?php endwhile; ?>
      </select>
      <select name="status" class="form-select form-select-sm" style="width:auto" onchange="this.form.submit()">
        <option value="">All Status</option>
        <option value="planned" <?= $status === 'planned' ? 'selected' : '' ?>>Planned</option>
        <option value="ongoing" <?= $status === 'ongoing' ? 'selected' : '' ?>>Ongoing</option>
        <option value="completed" <?= $status === 'completed' ? 'selected' : '' ?>>Completed</option>
        <option value="handed-over" <?= $status === 'handed-over' ? 'selected' : '' ?>>Handed Over</option>
      </select>
    </form>
  </div>
  <a href="/intona/admin/projects/create.php" class="btn btn-primary"><i class="bi bi-plus-lg"></i> New Project</a>
</div>

<div class="card">
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table datatable table-hover mb-0">
        <thead>
          <tr><th>ID</th><th>Title</th><th>Category</th><th>Status</th><th>Location</th><th>Featured</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <?php while ($p = $projects->fetch_assoc()): ?>
          <tr>
            <td><?= $p['id'] ?></td>
            <td><strong><?= esc($p['title']) ?></strong></td>
            <td><span class="badge bg-primary-subtle text-primary-emphasis"><?= esc($p['category']) ?></span></td>
            <td>
              <span class="badge <?= match($p['status']) { 'completed' => 'bg-success', 'ongoing' => 'bg-info', 'handed-over' => 'bg-secondary', default => 'bg-warning' } ?>">
                <?= ucfirst($p['status']) ?>
              </span>
            </td>
            <td><?= esc($p['location']) ?></td>
            <td><?= $p['featured'] ? '<i class="bi bi-star-fill text-warning"></i>' : '' ?></td>
            <td>
              <a href="/intona/admin/projects/edit.php?id=<?= $p['id'] ?>" class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></a>
              <a href="/intona/admin/projects/delete.php?id=<?= $p['id'] ?>" class="btn btn-sm btn-outline-danger" data-confirm="Delete this project?"><i class="bi bi-trash"></i></a>
            </td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
