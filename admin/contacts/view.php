<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/helpers.php';
requireAuth();

$conn = getDb();
$id = (int)($_GET['id'] ?? 0);
$item = $conn->query("SELECT * FROM contacts WHERE id = $id")->fetch_assoc();
if (!$item) { header('Location: /intona/admin/contacts/index.php'); exit; }

$conn->query("UPDATE contacts SET is_read=1 WHERE id=$id");

$pageTitle = 'Contact Message';
include __DIR__ . '/../includes/header.php';
?>
<div class="card">
  <div class="card-header d-flex justify-content-between">
    <span>Message from <?= esc($item['name']) ?></span>
    <a href="/intona/admin/contacts/index.php" class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-left"></i> Back</a>
  </div>
  <div class="card-body">
    <div class="row g-3 mb-4">
      <div class="col-md-4"><strong>Name:</strong> <?= esc($item['name']) ?></div>
      <div class="col-md-4"><strong>Email:</strong> <a href="mailto:<?= esc($item['email']) ?>"><?= esc($item['email']) ?></a></div>
      <div class="col-md-4"><strong>Date:</strong> <?= date('F j, Y g:i a', strtotime($item['created_at'])) ?></div>
      <div class="col-12"><strong>Subject:</strong> <?= esc($item['subject'] ?: 'N/A') ?></div>
      <div class="col-12"><strong>Message:</strong>
        <div class="p-3 bg-light rounded mt-2"><?= nl2br(esc($item['message'])) ?></div>
      </div>
    </div>
    <a href="mailto:<?= esc($item['email']) ?>?subject=Re: <?= urlencode($item['subject'] ?? 'Your Inquiry') ?>" class="btn btn-primary"><i class="bi bi-reply"></i> Reply via Email</a>
  </div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
