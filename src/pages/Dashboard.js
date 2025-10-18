// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { RiMoneyDollarCircleLine, RiFileList3Line, RiBarChartLine } from "react-icons/ri"; 
// ❗️ 1. Import Spinner ที่เราสร้าง
import LoadingSpinner from '../components/LoadingSpinner';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
const API_URL = 'http://fms.pnu.ac.th/Mistermad02/Backend/dashboard_api.php'; // ❗️ (ตรวจสอบ URL ของคุณ)

// (ฟังก์ชัน createChartData เหมือนเดิม)
const createChartData = (labels, data, label) => ({
  labels,
  datasets: [{
    label,
    data,
    backgroundColor: [
      '#00a651', '#f58220', '#ed1c24', '#007bff', '#ffc107', '#6f42c1',
    ],
    borderColor: '#fff',
    borderWidth: 1,
  }]
});

function Dashboard() {
  // ❗️ 2. สร้าง State สำหรับเช็กการโหลด
  const [isLoading, setIsLoading] = useState(true);

  // (State ข้อมูลเหมือนเดิม)
  const [districtData, setDistrictData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [kpiData, setKpiData] = useState({
    totalSales: 0,
    totalBills: 0,
    avgSalePerBill: 0,
  });

  // (ฟังก์ชัน fetchKpiData และ fetchData เหมือนเดิม)
  const fetchKpiData = async () => {
    const response = await axios.get(`${API_URL}?report=kpi`);
    setKpiData(response.data);
  };
  
  const fetchData = async (reportType, setData, label) => {
    const response = await axios.get(`${API_URL}?report=${reportType}`);
    const data = response.data;
    const labels = data.map(item => item.district || item.category || item.payment_type);
    const values = data.map(item => item.total_sales);
    setData(createChartData(labels, values, label));
  };


  // ❗️ 3. ปรับปรุง useEffect ให้ทำงานรวบยอด
  useEffect(() => {
    // สร้างฟังก์ชัน async ภายใน useEffect
    const loadDashboardData = async () => {
      setIsLoading(true); // 3.1 บอกว่า "กำลังโหลด..."
      try {
        // 3.2 เรียก API ทั้งหมดพร้อมกัน (เร็วขึ้น)
        await Promise.all([
          fetchKpiData(),
          fetchData('by_district', setDistrictData, 'ยอดขายตามอำเภอ'),
          fetchData('by_category', setCategoryData, 'ยอดขายตามหมวดหมู่'),
          fetchData('by_payment_type', setPaymentData, 'ยอดขายตามการชำระเงิน')
        ]);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        // (ในอนาคตคุณอาจจะตั้ง state error เพื่อแสดงผล)
      } finally {
        setIsLoading(false); // 3.3 บอกว่า "โหลดเสร็จแล้ว" (ไม่ว่าจะสำเร็จหรือล้มเหลว)
      }
    };

    loadDashboardData();
  }, []); // (ทำงานครั้งเดียวเมื่อเข้าหน้า)

  // ❗️ 4. ตรวจสอบ State ก่อน Render
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // ❗️ 5. (ถ้าโหลดเสร็จแล้ว) แสดงผลหน้า Dashboard ตามปกติ
  return (
    <div>
      <h1 className="mb-4">Dashboard สรุปยอดขาย</h1>
      
      {/* --- ส่วนที่ 1: การ์ด KPI --- */}
      <div className="row g-4 mb-4">
        {/* (Card ยอดขายรวม) */}
        <div className="col-md-4">
          <div className="card h-100" style={{borderLeft: '5px solid var(--color-711-green)'}}>
            <div className="card-body d-flex align-items-center">
              <RiMoneyDollarCircleLine size={50} className="me-3 text-success" />
              <div>
                <h6 className="text-muted mb-0">ยอดขายรวม</h6>
                <h3 className="fw-bold mb-0">
                  {parseFloat(kpiData.totalSales).toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
                </h3>
              </div>
            </div>
          </div>
        </div>
        {/* (Card จำนวนบิล) */}
        <div className="col-md-4">
          <div className="card h-100" style={{borderLeft: '5px solid var(--color-711-orange)'}}>
            <div className="card-body d-flex align-items-center">
              <RiFileList3Line size={50} className="me-3 text-warning" />
              <div>
                <h6 className="text-muted mb-0">จำนวนบิลทั้งหมด</h6>
                <h3 className="fw-bold mb-0">
                  {parseFloat(kpiData.totalBills).toLocaleString('th-TH')}
                </h3>
              </div>
            </div>
          </div>
        </div>
        {/* (Card ยอดเฉลี่ย) */}
        <div className="col-md-4">
          <div className="card h-100" style={{borderLeft: '5px solid #007bff'}}>
            <div className="card-body d-flex align-items-center">
              <RiBarChartLine size={50} className="me-3 text-primary" />
              <div>
                <h6 className="text-muted mb-0">ยอดขายเฉลี่ยต่อบิล</h6>
                <h3 className="fw-bold mb-0">
                  {parseFloat(kpiData.avgSalePerBill).toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- ส่วนที่ 2: กราฟ --- */}
      <div className="row g-4">
        {/* (กราฟอำเภอ) */}
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header"><span className="icon-text">ยอดขายตามอำเภอ</span></div>
            <div className="card-body d-flex justify-content-center align-items-center p-4" style={{ minHeight: '300px' }}>
              {districtData ? <Bar data={districtData} options={{ responsive: true, maintainAspectRatio: false }} /> : <p>Loading...</p>}
            </div>
          </div>
        </div>
        {/* (กราฟหมวดหมู่) */}
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header"><span className="icon-text">ยอดขายตามหมวดหมู่สินค้า</span></div>
            <div className="card-body d-flex justify-content-center align-items-center p-4" style={{ minHeight: '300px', maxWidth: '350px', margin: 'auto' }}>
              {categoryData ? <Pie data={categoryData} options={{ responsive: true, maintainAspectRatio: false }} /> : <p>Loading...</p>}
            </div>
          </div>
        </div>
        {/* (กราฟการชำระเงิน) */}
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header"><span className="icon-text">ยอดขายตามประเภทการชำระเงิน</span></div>
            <div className="card-body d-flex justify-content-center align-items-center p-4" style={{ minHeight: '300px', maxWidth: '350px', margin: 'auto' }}>
              {paymentData ? <Doughnut data={paymentData} options={{ responsive: true, maintainAspectRatio: false }} /> : <p>Loading...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;