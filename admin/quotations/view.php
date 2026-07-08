<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$item = $conn->query("SELECT * FROM quotations WHERE id = $id")->fetch_assoc();
if (!$item) { header('Location: /intona/admin/quotations/index.php'); exit; }

$conn->query("UPDATE quotations SET is_read=1 WHERE id=$id");

$pageTitle = 'Quotation Request';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header d-flex justify-content-between">
    <span>Quotation from <?= esc($item['name']) ?></span>
    <a href="/intona/admin/quotations/index.php" class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-left"></i> Back</a>
  </div>
  <div class="card-body">
    <div class="row g-3">
      <div class="col-md-4"><strong>Name:</strong> <?= esc($item['name']) ?></div>
      <div class="col-md-4"><strong>Company:</strong> <?= esc($item['company'] ?: '—') ?></div>
      <div class="col-md-4"><strong>Date:</strong> <?= date('F j, Y g:i a', strtotime($item['created_at'])) ?></div>
      <div class="col-md-4"><strong>Email:</strong> <a href="mailto:<?= esc($item['email']) ?>"><?= esc($item['email']) ?></a></div>
      <div class="col-md-4"><strong>Phone:</strong> <a href="tel:<?= esc($item['phone']) ?>"><?= esc($item['phone']) ?></a></div>
      <div class="col-md-4"><strong>Project Type:</strong> <?= esc($item['project_type']) ?></div>
      <div class="col-md-4"><strong>Budget:</strong> <?= esc($item['budget']) ?></div>
      <div class="col-md-4"><strong>Timeline:</strong> <?= esc($item['timeline']) ?></div>
      <?php if ($item['attachment']): ?>
      <div class="col-md-4"><strong>Attachment:</strong> <a href="<?= $item['attachment'] ?>" target="_blank" class="btn btn-sm btn-outline-primary"><i class="bi bi-paperclip"></i> Download</a></div>
      <?php endif; ?>
      <div class="col-12"><strong>Description:</strong>
        <div class="p-3 bg-light rounded mt-2"><?= nl2br(esc($item['description'])) ?></div>
      </div>
    </div>
    <div class="mt-4">
      <a href="mailto:<?= esc($item['email']) ?>?subject=Re: Quotation Request — <?= urlencode($item['project_type'] ?? '') ?>" class="btn btn-primary"><i class="bi bi-reply"></i> Reply</a>
    </div>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
