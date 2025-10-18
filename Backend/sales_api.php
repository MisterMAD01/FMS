<?php
require_once 'api_config.php'; // เรียกไฟล์ตั้งค่า

switch ($method) {
    case 'GET': // ------------------- ดึงรายการบิลทั้งหมด (Read) -------------------
        // สำหรับหน้า BillList.js
        try {
            $sql = "SELECT bill_id, bill_date, bill_time, district, customer_type, payment_type, total_amount 
                    FROM sales_headers 
                    ORDER BY bill_date DESC, bill_time DESC";
            $stmt = $pdo->query($sql);
            $bills = $stmt->fetchAll();
            json_response($bills);
        } catch (PDOException $e) {
            json_response(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
        break;

    case 'POST': // ------------------- บันทึกบิลใหม่ (Create) -------------------
        // สำหรับหน้า NewBill.js
        
        // $input_data ถูกกำหนดไว้ใน api_config.php แล้ว
        $header = $input_data->header ?? null;
        $details = $input_data->details ?? null;

        if (!$header || !$details || empty($details)) {
            json_response(['status' => 'error', 'message' => 'Invalid data. Header and details are required.'], 400);
        }

        // เริ่มต้น Transaction
        // นี่คือส่วนสำคัญ: ถ้าขั้นตอนใดขั้นตอนหนึ่ง (เช่น บันทึก details) ล้มเหลว
        // ข้อมูล header ที่บันทึกไปก่อนหน้าจะถูกยกเลิก (rollback) ทั้งหมด
        try {
            $pdo->beginTransaction();

            // 1. บันทึก Sales Header
            $sqlHeader = "INSERT INTO sales_headers 
                          (bill_date, bill_time, province, district, payment_type, promotion, customer_type, total_amount) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmtHeader = $pdo->prepare($sqlHeader);
            $stmtHeader->execute([
                $header->bill_date,
                $header->bill_time,
                $header->province,
                $header->district,
                $header->payment_type,
                $header->promotion,
                $header->customer_type,
                $header->total_amount
            ]);

            // 2. ดึง Bill ID ที่เพิ่งสร้าง
            $bill_id = $pdo->lastInsertId();

            // 3. วนลูปเพื่อบันทึก Sales Details
            $sqlDetails = "INSERT INTO sales_details 
                           (bill_id, product_id, quantity, subtotal) 
                           VALUES (?, ?, ?, ?)";
            $stmtDetails = $pdo->prepare($sqlDetails);

            foreach ($details as $item) {
                $stmtDetails->execute([
                    $bill_id,
                    $item->product_id,
                    $item->quantity,
                    $item->subtotal
                ]);
            }

            // 4. ถ้าทุกอย่างสำเร็จ, ยืนยัน Transaction
            $pdo->commit();

            json_response(['status' => 'success', 'message' => 'Bill saved successfully', 'bill_id' => $bill_id], 201);

        } catch (Exception $e) {
            // 5. หากเกิดข้อผิดพลาด, ยกเลิก Transaction
            $pdo->rollBack();
            json_response(['status' => 'error', 'message' => 'Transaction failed: ' . $e->getMessage()], 500);
        }
        break;

    default:
        json_response(['status' => 'error', 'message' => 'Method Not Allowed'], 405);
        break;
}
?>