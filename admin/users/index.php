<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

if ($_SESSION['admin_role'] !== 'admin') { header('Location: /intona/admin/dashboard.php'); exit; }

$conn = getDb();
$pageTitle = 'Admin Users';

include __DIR__ . '/../includes/header.php';

$users = $conn->query("SELECT * FROM admin_users ORDER BY created_at ASC");
?>
<div class="d-flex justify-content-between align-items-center mb-3">
  <a href="/intona/admin/users/create.php" class="btn btn-primary"><i class="bi bi-plus-lg"></i> New Admin User</a>
</div>
<div class="card">
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Last Login</th><th>Active</th><th>Actions</th></tr></thead>
        <tbody>
          <?php while ($u = $users->fetch_assoc()): ?>
          <tr>
            <td><?= $u['id'] ?></td>
            <td><strong><?= esc($u['name']) ?></strong></td>
            <td><?= esc($u['email']) ?></td>
            <td><span class="badge <?= $u['role'] === 'admin' ? 'bg-danger' : 'bg-info' ?>"><?= $u['role'] ?></span></td>
            <td><?= $u['last_login'] ? date('M j, Y g:i a', strtotime($u['last_login'])) : 'Never' ?></td>
            <td><?= $u['active'] ? '<span class="badge bg-success">Active</span>' : '<span class="badge bg-secondary">Inactive</span>' ?></td>
            <td>
              <?php if ($u['id'] !== (int)$_SESSION['admin_id']): ?>
              <a href="/intona/admin/users/edit.php?id=<?= $u['id'] ?>" class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></a>
              <a href="/intona/admin/users/delete.php?id=<?= $u['id'] ?>" class="btn btn-sm btn-outline-danger" data-confirm="Delete this user?"><i class="bi bi-trash"></i></a>
              <?php else: ?>
              <span class="text-muted small">(you)</span>
              <?php endif; ?>
            </td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
