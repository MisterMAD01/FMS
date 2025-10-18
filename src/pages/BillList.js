// src/pages/BillList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiFileList3Fill } from "react-icons/ri";
// ❗️ 1. Import Spinner
import LoadingSpinner from '../components/LoadingSpinner';

const API_URL = 'http://fms.pnu.ac.th/Mistermad02/Backend/sales_api.php'; 

function BillList() {
  // ❗️ 2. สร้าง State สำหรับเช็กการโหลด
  const [isLoading, setIsLoading] = useState(true);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    // (เราจะเก็บ fetchBills ไว้ข้างนอก useEffect เพื่อให้โค้ดอ่านง่าย)
    fetchBills();
  }, []);

  // ❗️ 3. ปรับปรุงฟังก์ชัน fetchBills
  const fetchBills = async () => {
    setIsLoading(true); // บอกว่ากำลังโหลด...
    try {
      const response = await axios.get(API_URL);
      setBills(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setIsLoading(false); // บอกว่าโหลดเสร็จแล้ว (ไม่ว่าจะสำเร็จหรือล้มเหลว)
    }
  };

  // ❗️ 4. ตรวจสอบ State ก่อน Render
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // ❗️ 5. (ถ้าโหลดเสร็จแล้ว) แสดงผลหน้าตารางตามปกติ
  return (
    <div>
      <h1 className="mb-4">
        <span className="icon-text"><RiFileList3Fill /> รายการบิลทั้งหมด</span>
      </h1>
      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th style={{paddingLeft: '1.5rem'}}>Bill ID</th>
                  <th>วันที่</th>
                  <th>เวลา</th>
                  <th>อำเภอ</th>
                  <th>ประเภทลูกค้า</th>
                  <th>การชำระเงิน</th>
                  <th style={{paddingRight: '1.5rem'}}>ยอดรวม (บาท)</th>
                </tr>
              </thead>
              <tbody>
                {/* ❗️ (เพิ่ม) ตรวจสอบว่ามีบิลหรือไม่ */}
                {bills.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-muted">
                      ยังไม่มีข้อมูลบิล
                    </td>
                  </tr>
                ) : (
                  bills.map((bill) => (
                    <tr key={bill.bill_id}>
                      <td style={{paddingLeft: '1.5rem'}}>{bill.bill_id}</td>
                      <td>{new Date(bill.bill_date).toLocaleDateString('th-TH')}</td>
                      <td>{bill.bill_time}</td>
                      <td>{bill.district}</td>
                      <td>{bill.customer_type}</td>
                      <td>{bill.payment_type}</td>
                      <td style={{paddingRight: '1.5rem'}} className="fw-bold text-success">
                        {parseFloat(bill.total_amount).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillList;