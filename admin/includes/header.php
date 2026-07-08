<?php require_once __DIR__ . '/auth.php'; requireAuth(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= esc($pageTitle ?? 'Dashboard') ?> — Intona Admin</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" rel="stylesheet">
  <link href="/intona/admin/assets/css/admin.css" rel="stylesheet">
</head>
<body>
<div class="wrapper">
  <aside class="sidebar">
    <div class="sidebar-brand">
      <span class="brand-text">INTONA</span>
      <small>Admin Portal</small>
    </div>
    <nav class="sidebar-nav">
      <a href="/intona/admin/dashboard.php" class="nav-item <?= basename($_SERVER['PHP_SELF']) === 'dashboard.php' ? 'active' : '' ?>">
        <i class="bi bi-speedometer2"></i> Dashboard
      </a>
      <a href="/intona/admin/projects/index.php" class="nav-item <?= str_contains($_SERVER['PHP_SELF'], '/projects/') ? 'active' : '' ?>">
        <i class="bi bi-building"></i> Projects
      </a>
      <a href="/intona/admin/services/index.php" class="nav-item <?= str_contains($_SERVER['PHP_SELF'], '/services/') ? 'active' : '' ?>">
        <i class="bi bi-grid"></i> Services
      </a>
      <a href="/intona/admin/team/index.php" class="nav-item <?= str_contains($_SERVER['PHP_SELF'], '/team/') ? 'active' : '' ?>">
        <i class="bi bi-people"></i> Team
      </a>
      <a href="/intona/admin/equipment/index.php" class="nav-item <?= str_contains($_SERVER['PHP_SELF'], '/equipment/') ? 'active' : '' ?>">
        <i class="bi bi-truck"></i> Equipment
      </a>
      <a href="/intona/admin/testimonials/index.php" class="nav-item <?= str_contains($_SERVER['PHP_SELF'], '/testimonials/') ? 'active' : '' ?>">
        <i class="bi bi-chat-quote"></i> Testimonials
      </a>
      <a href="/intona/admin/gallery/index.php" class="nav-item <?= str_contains($_SERVER['PHP_SELF'], '/gallery/') ? 'active' : '' ?>">
        <i class="bi bi-images"></i> Gallery
      </a>
      <a href="/intona/admin/news/index.php" class="nav-item <?= str_contains($_SERVER['PHP_SELF'], '/news/') ? 'active' : '' ?>">
        <i class="bi bi-newspaper"></i> News
      </a>
      <hr class="my-2 opacity-25">
      <a href="/intona/admin/contacts/index.php" class="nav-item <?= str_contains($_SERVER['PHP_SELF'], '/contacts/') ? 'active' : '' ?>">
        <i class="bi bi-envelope"></i> Contacts
        <?php
        $c = getDb()->query("SELECT COUNT(*) as cnt FROM contacts WHERE is_read=0")->fetch_assoc();
        if ($c['cnt'] > 0) echo '<span class="badge bg-warning text-dark ms-auto">' . $c['cnt'] . '</span>';
        ?>
      </a>
      <a href="/intona/admin/quotations/index.php" class="nav-item <?= str_contains($_SERVER['PHP_SELF'], '/quotations/') ? 'active' : '' ?>">
        <i class="bi bi-file-text"></i> Quotations
        <?php
        $q = getDb()->query("SELECT COUNT(*) as cnt FROM quotations WHERE is_read=0")->fetch_assoc();
        if ($q['cnt'] > 0) echo '<span class="badge bg-warning text-dark ms-auto">' . $q['cnt'] . '</span>';
        ?>
      </a>
      <a href="/intona/admin/careers/index.php" class="nav-item <?= str_contains($_SERVER['PHP_SELF'], '/careers/') ? 'active' : '' ?>">
        <i class="bi bi-briefcase"></i> Applications
      </a>
      <hr class="my-2 opacity-25">
      <a href="/intona/admin/settings/index.php" class="nav-item <?= str_contains($_SERVER['PHP_SELF'], '/settings/') ? 'active' : '' ?>">
        <i class="bi bi-gear"></i> Settings
      </a>
      <a href="/intona/admin/users/index.php" class="nav-item <?= str_contains($_SERVER['PHP_SELF'], '/users/') ? 'active' : '' ?>">
        <i class="bi bi-shield-lock"></i> Admin Users
      </a>
      <a href="/intona/admin/activity-log/index.php" class="nav-item <?= str_contains($_SERVER['PHP_SELF'], '/activity-log/') ? 'active' : '' ?>">
        <i class="bi bi-clock-history"></i> Activity Log
      </a>
    </nav>
  </aside>
  <div class="main-content">
    <header class="topbar">
      <div class="d-flex align-items-center gap-3">
        <button class="btn btn-sm btn-outline-secondary d-md-none" onclick="document.querySelector('.sidebar').classList.toggle('show')">
          <i class="bi bi-list"></i>
        </button>
        <h5 class="mb-0"><?= esc($pageTitle ?? 'Dashboard') ?></h5>
      </div>
      <div class="d-flex align-items-center gap-3">
        <span class="text-muted small"><?= esc($_SESSION['admin_name'] ?? '') ?></span>
        <a href="/intona/admin/logout.php" class="btn btn-sm btn-outline-danger"><i class="bi bi-box-arrow-right"></i></a>
      </div>
    </header>
    <div class="content p-4">
