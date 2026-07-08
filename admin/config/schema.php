<?php
require_once __DIR__ . '/database.php';

function runSchema(): void {
  $conn = getDb();

  $tables = [
    "CREATE TABLE IF NOT EXISTS admin_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('admin','editor') NOT NULL DEFAULT 'editor',
      last_login DATETIME NULL,
      password_changed_at DATETIME NULL,
      active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS activity_log (
      id INT AUTO_INCREMENT PRIMARY KEY,
      admin_id INT NULL,
      action VARCHAR(50) NOT NULL,
      entity_type VARCHAR(50) NOT NULL,
      entity_id INT NULL,
      details TEXT NULL,
      ip_address VARCHAR(45) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS site_settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      setting_key VARCHAR(100) NOT NULL UNIQUE,
      setting_value TEXT NULL,
      updated_by INT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      slug VARCHAR(200) NOT NULL UNIQUE,
      description TEXT NULL,
      category VARCHAR(100) NULL,
      location VARCHAR(200) NULL,
      client VARCHAR(200) NULL,
      budget VARCHAR(100) NULL,
      duration VARCHAR(100) NULL,
      status ENUM('planned','ongoing','completed','handed-over') NOT NULL DEFAULT 'planned',
      technologies TEXT NULL,
      images TEXT NULL,
      featured TINYINT(1) NOT NULL DEFAULT 0,
      sort_order INT NOT NULL DEFAULT 0,
      deleted_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      slug VARCHAR(200) NOT NULL UNIQUE,
      description TEXT NULL,
      icon VARCHAR(50) NULL,
      image VARCHAR(255) NULL,
      category VARCHAR(100) NULL,
      sort_order INT NOT NULL DEFAULT 0,
      deleted_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS team_members (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      role VARCHAR(200) NULL,
      bio TEXT NULL,
      image VARCHAR(255) NULL,
      email VARCHAR(100) NULL,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS equipment (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      slug VARCHAR(200) NOT NULL UNIQUE,
      description TEXT NULL,
      image VARCHAR(255) NULL,
      specifications JSON NULL,
      availability ENUM('available','rented','maintenance') NOT NULL DEFAULT 'available',
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      company VARCHAR(200) NULL,
      role VARCHAR(200) NULL,
      content TEXT NOT NULL,
      rating TINYINT NOT NULL DEFAULT 5,
      image VARCHAR(255) NULL,
      sort_order INT NOT NULL DEFAULT 0,
      active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS gallery (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NULL,
      image VARCHAR(255) NOT NULL,
      category VARCHAR(100) NULL,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS news (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      slug VARCHAR(200) NOT NULL UNIQUE,
      excerpt TEXT NULL,
      content LONGTEXT NULL,
      category VARCHAR(100) NULL,
      image VARCHAR(255) NULL,
      featured TINYINT(1) NOT NULL DEFAULT 0,
      date_published DATE NOT NULL,
      deleted_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      email VARCHAR(200) NOT NULL,
      subject VARCHAR(200) NULL,
      message TEXT NOT NULL,
      is_read TINYINT(1) NOT NULL DEFAULT 0,
      notified TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS quotations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      company VARCHAR(200) NULL,
      email VARCHAR(200) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      project_type VARCHAR(200) NULL,
      budget VARCHAR(100) NULL,
      timeline VARCHAR(100) NULL,
      description TEXT NULL,
      attachment VARCHAR(255) NULL,
      is_read TINYINT(1) NOT NULL DEFAULT 0,
      notified TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS career_applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      vacancy_id INT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(200) NOT NULL,
      phone VARCHAR(50) NULL,
      cover_letter TEXT NULL,
      cv_path VARCHAR(255) NULL,
      vacancy_title VARCHAR(200) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
  ];

  foreach ($tables as $sql) {
    $conn->query($sql);
  }

  $res = $conn->query("SELECT COUNT(*) as cnt FROM admin_users");
  $row = $res->fetch_assoc();
  if ((int)$row['cnt'] === 0) {
    $hash = password_hash('admin123', PASSWORD_BCRYPT);
    $stmt = $conn->prepare("INSERT INTO admin_users (name, email, password_hash, role, password_changed_at) VALUES (?, ?, ?, 'admin', NOW())");
    $name = 'Super Admin';
    $email = 'admin@intona.com';
    $stmt->bind_param('sss', $name, $email, $hash);
    $stmt->execute();
  }

  $defaults = [
    'company_name' => 'Intona Constructions Ltd',
    'company_tagline' => 'Building Excellence. Delivering Quality.',
    'company_phone' => '+256 700 000 000',
    'company_email' => 'info@intonaconstructions.com',
    'company_address' => 'Plot 00, Kampala Road, Kampala, Uganda',
    'company_working_hours' => 'Mon - Fri: 8:00 AM - 5:00 PM',
    'company_whatsapp' => '+256700000000',
    'social_linkedin' => 'https://linkedin.com/company/intona',
    'social_facebook' => 'https://facebook.com/intona',
    'social_twitter' => 'https://twitter.com/intona',
    'social_instagram' => 'https://instagram.com/intona',
    'social_youtube' => 'https://youtube.com/@intona',
  ];
  foreach ($defaults as $key => $value) {
    $stmt = $conn->prepare("INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES (?, ?)");
    $stmt->bind_param('ss', $key, $value);
    $stmt->execute();
  }
}
