<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$pageTitle = 'Settings';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && verifyCsrf($_POST['csrf'] ?? '')) {
  foreach ($_POST['settings'] as $key => $value) {
    $stmt = $conn->prepare("UPDATE site_settings SET setting_value = ?, updated_by = ? WHERE setting_key = ?");
    $stmt->bind_param('sis', $value, $_SESSION['admin_id'], $key);
    $stmt->execute();
    if ($stmt->affected_rows === 0) {
      $stmt = $conn->prepare("INSERT INTO site_settings (setting_key, setting_value, updated_by) VALUES (?, ?, ?)");
      $stmt->bind_param('ssi', $key, $value, $_SESSION['admin_id']);
      $stmt->execute();
    }
  }
  logActivity('update', 'settings', null, 'Updated site settings');
  $saved = true;
}

$settings = $conn->query("SELECT setting_key, setting_value FROM site_settings ORDER BY setting_key");

$groups = [
  'Company' => ['company_name', 'company_tagline', 'company_phone', 'company_email', 'company_address', 'company_working_hours', 'company_whatsapp'],
  'Social Media' => ['social_linkedin', 'social_facebook', 'social_twitter', 'social_instagram', 'social_youtube'],
];

$values = [];
while ($row = $settings->fetch_assoc()) {
  $values[$row['setting_key']] = $row['setting_value'];
}

include __DIR__ . '/../includes/header.php';
?>
<?php if (isset($saved)): ?><div class="alert alert-success">Settings saved.</div><?php endif; ?>

<form method="post">
  <input type="hidden" name="csrf" value="<?= csrfToken() ?>">
  <?php foreach ($groups as $groupName => $keys): ?>
  <div class="card mb-4">
    <div class="card-header"><?= $groupName ?></div>
    <div class="card-body">
      <div class="row g-3">
        <?php foreach ($keys as $key): ?>
        <div class="col-md-6">
          <label class="form-label small fw-medium"><?= ucwords(str_replace('_', ' ', $key)) ?></label>
          <input type="text" name="settings[<?= $key ?>]" class="form-control" value="<?= esc($values[$key] ?? '') ?>">
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
  <?php endforeach; ?>
  <button type="submit" class="btn btn-primary"><i class="bi bi-check-lg"></i> Save All Settings</button>
</form>

<?php include __DIR__ . '/../includes/footer.php'; ?>
