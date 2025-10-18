<?php
// #################################################
// ### 1. การตั้งค่าการเชื่อมต่อฐานข้อมูล (Database Configuration) ###
// #################################################
define('DB_HOST', 'fms.pnu.ac.th');
define('DB_NAME', 'Mistermad01'); // <-- ❗️ แก้ไขตรงนี้
define('DB_USER', 'Mistermad01');                // <-- ❗️ แก้ไขตรงนี้ (ถ้าใช้ชื่ออื่น)
define('DB_PASS', '6560506027');       // <-- ❗️ แก้ไขตรงนี้
define('DB_CHARSET', 'utf8mb4');

// #################################################
// ### 2. การตั้งค่า CORS (Cross-Origin Resource Sharing) ###
// #################################################
// อนุญาตให้ React (เช่น http://localhost:3000) เรียก API นี้ได้
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // ในโหมด Production ควรกำหนด Domain ที่แน่นอน
    // header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Origin: *"); // สำหรับ Development
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // แคชได้ 1 วัน
}

// จัดการ OPTIONS request (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

// ตั้งค่า Header มาตรฐานสำหรับ JSON response
header("Content-Type: application/json; charset=UTF-8");

// #################################################
// ### 3. สร้างการเชื่อมต่อ PDO (PHP Data Objects) ###
// #################################################
$pdo = null;
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit; // หยุดการทำงานทันทีหากเชื่อมต่อไม่ได้
}

// #################################################
// ### 4. ตัวช่วย (Helpers) ###
// #################################################

// ฟังก์ชันสำหรับส่ง JSON response
function json_response($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

// อ่านข้อมูล JSON ที่ส่งมาจาก React (สำหรับ POST, PUT)
$input_data = json_decode(file_get_contents("php://input"));

// เก็บ HTTP Method (GET, POST, PUT, DELETE)
$method = $_SERVER['REQUEST_METHOD'];
?>