<?php
require_once 'api_config.php'; // เรียกไฟล์ตั้งค่า

switch ($method) {
    case 'GET': // ------------------- ดึงข้อมูลสินค้า (Read) -------------------
        try {
            $stmt = $pdo->query("SELECT * FROM products ORDER BY product_id DESC");
            $products = $stmt->fetchAll();
            json_response($products);
        } catch (PDOException $e) {
            json_response(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
        break;

    case 'POST': // ------------------- เพิ่มสินค้าใหม่ (Create) -------------------
        // $input_data ถูกกำหนดไว้ใน api_config.php แล้ว
        if (empty($input_data->product_name) || empty($input_data->category) || empty($input_data->price)) {
            json_response(['status' => 'error', 'message' => 'Missing required fields'], 400);
        }
        
        try {
            $sql = "INSERT INTO products (product_name, category, price) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $input_data->product_name,
                $input_data->category,
                $input_data->price
            ]);
            json_response(['status' => 'success', 'message' => 'Product added successfully'], 201);
        } catch (PDOException $e) {
            json_response(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
        break;

    case 'PUT': // ------------------- อัปเดตสินค้า (Update) -------------------
        if (empty($input_data->product_id) || empty($input_data->product_name) || empty($input_data->category) || empty($input_data->price)) {
            json_response(['status' => 'error', 'message' => 'Missing required fields'], 400);
        }
        
        try {
            $sql = "UPDATE products SET product_name = ?, category = ?, price = ? WHERE product_id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $input_data->product_name,
                $input_data->category,
                $input_data->price,
                $input_data->product_id
            ]);
            json_response(['status' => 'success', 'message' => 'Product updated successfully']);
        } catch (PDOException $e) {
            json_response(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
        break;

    case 'DELETE': // ------------------- ลบสินค้า (Delete) -------------------
        if (empty($_GET['id'])) {
            json_response(['status' => 'error', 'message' => 'Product ID is required'], 400);
        }
        
        try {
            $id = $_GET['id'];
            $sql = "DELETE FROM products WHERE product_id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id]);
            json_response(['status' => 'success', 'message' => 'Product deleted successfully']);
        } catch (PDOException $e) {
            // อาจเกิด error ถ้าสินค้านี้ถูกใช้ใน sales_details (Foreign Key constraint)
            json_response(['status' => 'error', 'message' => 'Failed to delete product. It might be used in sales records.'], 500);
        }
        break;

    default:
        json_response(['status' => 'error', 'message' => 'Method Not Allowed'], 405);
        break;
}
?>