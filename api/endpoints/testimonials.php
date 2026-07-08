<?php
$conn = getDb();
$result = $conn->query("SELECT * FROM testimonials WHERE active=1 ORDER BY sort_order ASC")->fetch_all(MYSQLI_ASSOC);
echo json_encode(['success' => true, 'data' => $result]);
