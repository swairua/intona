<?php
session_start();
session_destroy();
header('Location: /intona/admin/login.php');
exit;
