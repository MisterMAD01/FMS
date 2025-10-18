<?php
require_once 'api_config.php'; // เรียกไฟล์ตั้งค่า

// ต้องเป็น GET method เท่านั้น
if ($method !== 'GET') {
    json_response(['status' => 'error', 'message' => 'Method Not Allowed'], 405);
}

// ตรวจสอบว่ามี ?report=... หรือไม่
$reportType = $_GET['report'] ?? '';
$sql = '';

switch ($reportType) {
    case 'by_district':
        $sql = "SELECT district, SUM(total_amount) AS total_sales
                FROM sales_headers
                WHERE district IS NOT NULL AND district != ''
                GROUP BY district
                ORDER BY total_sales DESC";
        $stmt = $pdo->query($sql);
        $data = $stmt->fetchAll();
        json_response($data);
        break;

    case 'by_payment_type':
        $sql = "SELECT payment_type, SUM(total_amount) AS total_sales
                FROM sales_headers
                GROUP BY payment_type
                ORDER BY total_sales DESC";
        $stmt = $pdo->query($sql);
        $data = $stmt->fetchAll();
        json_response($data);
        break;

    case 'by_category':
        $sql = "SELECT p.category, SUM(sd.subtotal) AS total_sales
                FROM sales_details sd
                JOIN products p ON sd.product_id = p.product_id
                GROUP BY p.category
                ORDER BY total_sales DESC";
        $stmt = $pdo->query($sql);
        $data = $stmt->fetchAll();
        json_response($data);
        break;
    
    // --- ❗️ ส่วนที่เพิ่มใหม่ ---
    case 'kpi':
        $sql = "SELECT 
                    COALESCE(SUM(total_amount), 0) AS totalSales,
                    COALESCE(COUNT(bill_id), 0) AS totalBills
                FROM sales_headers";
        $stmt = $pdo->query($sql);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $avgSalePerBill = 0;
        // ป้องกันการหารด้วยศูนย์
        if ($data['totalBills'] > 0) {
            $avgSalePerBill = $data['totalSales'] / $data['totalBills'];
        }
        
        // เพิ่มค่าที่คำนวณใหม่เข้าไปในผลลัพธ์
        $data['avgSalePerBill'] = $avgSalePerBill;

        // ส่งข้อมูล KPI กลับไป
        json_response($data);
        break;
    // --- ❗️ สิ้นสุดส่วนที่เพิ่มใหม่ ---

    default:
        json_response(['status' => 'error', 'message' => 'Invalid report type specified'], 400);
        break;
}
?>