<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$item = $conn->query("SELECT * FROM career_applications WHERE id = $id")->fetch_assoc();
if (!$item) { header('Location: /intona/admin/careers/index.php'); exit; }

$pageTitle = 'Application Details';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header d-flex justify-content-between">
    <span>Application from <?= esc($item['first_name']) ?> <?= esc($item['last_name']) ?></span>
    <a href="/intona/admin/careers/index.php" class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-left"></i> Back</a>
  </div>
  <div class="card-body">
    <div class="row g-3">
      <div class="col-md-4"><strong>Name:</strong> <?= esc($item['first_name']) ?> <?= esc($item['last_name']) ?></div>
      <div class="col-md-4"><strong>Email:</strong> <a href="mailto:<?= esc($item['email']) ?>"><?= esc($item['email']) ?></a></div>
      <div class="col-md-4"><strong>Phone:</strong> <a href="tel:<?= esc($item['phone']) ?>"><?= esc($item['phone']) ?></a></div>
      <div class="col-md-6"><strong>Position:</strong> <?= esc($item['vacancy_title'] ?: 'General Application') ?></div>
      <div class="col-md-6"><strong>Applied:</strong> <?= date('F j, Y g:i a', strtotime($item['created_at'])) ?></div>
      <?php if ($item['cv_path']): ?>
      <div class="col-12"><a href="<?= $item['cv_path'] ?>" target="_blank" class="btn btn-primary"><i class="bi bi-download"></i> Download CV</a></div>
      <?php endif; ?>
      <div class="col-12"><strong>Cover Letter:</strong>
        <div class="p-3 bg-light rounded mt-2"><?= nl2br(esc($item['cover_letter'])) ?></div>
      </div>
    </div>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
