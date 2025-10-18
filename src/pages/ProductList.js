// src/pages/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiPencilFill, RiDeleteBin6Fill, RiAddFill, RiRefreshLine } from "react-icons/ri";
// ❗️ 1. Import Spinner
import LoadingSpinner from '../components/LoadingSpinner';

const API_URL = 'http://fms.pnu.ac.th/Mistermad02/Backend/products_api.php';

const getCategoryColor = (category) => {
  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

function ProductList() {
  // ❗️ 2. เพิ่ม State สำหรับการโหลด
  const [isPageLoading, setIsPageLoading] = useState(true); // สำหรับโหลดหน้าครั้งแรก
  const [isSubmitting, setIsSubmitting] = useState(false); // สำหรับปุ่ม "บันทึก"

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ product_id: null, product_name: '', category: '', price: '' });
  const [isEditing, setIsEditing] = useState(false);

  // ❗️ 3. ปรับปรุง useEffect
  useEffect(() => {
    // สร้างฟังก์ชัน async ภายในนี้เพื่อจัดการ Page Loading
    const loadInitialProducts = async () => {
      setIsPageLoading(true);
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsPageLoading(false);
      }
    };
    
    loadInitialProducts();
  }, []); // ทำงานครั้งเดียว

  // (ฟังก์ชันนี้จะถูกเรียกโดย handleSubmit/handleDelete โดยไม่กระทบ Page Loading)
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error refetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ❗️ 4. ปรับปรุง handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // 4.1 เริ่มหมุนที่ปุ่ม
    
    try {
      if (isEditing) {
        await axios.put(API_URL, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      resetForm();
      await fetchProducts(); // 4.2 โหลดข้อมูลใหม่ (รอให้เสร็จ)
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setIsSubmitting(false); // 4.3 หยุดหมุนที่ปุ่ม
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setFormData(product);
    window.scrollTo(0, 0); 
  };

  // ❗️ 5. ปรับปรุง handleDelete
  const handleDelete = async (id) => {
    if (window.confirm('คุณต้องการลบสินค้านี้ใช่หรือไม่?')) {
      // (เราสามารถเพิ่ม isSubmitting ที่ปุ่มลบได้ แต่เพื่อความง่าย เราจะโหลดใหม่เลย)
      try {
        await axios.delete(`${API_URL}?id=${id}`);
        await fetchProducts(); // โหลดข้อมูลใหม่
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("ลบไม่สำเร็จ (อาจมีบิลอ้างอิงถึงสินค้านี้)");
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setFormData({ product_id: null, product_name: '', category: '', price: '' });
  };

  // ❗️ 6. ตรวจสอบ State ก่อน Render
  if (isPageLoading) {
    return <LoadingSpinner />;
  }

  // ❗️ 7. (ถ้าโหลดเสร็จแล้ว) แสดงผลหน้าตารางตามปกติ
  return (
    <div>
      <h1 className="mb-4">จัดการรายการสินค้า</h1>

      <div className="card mb-4">
        <div className="card-header">
          <span className="icon-text">
            {isEditing ? <RiPencilFill /> : <RiAddFill />}
            {isEditing ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
          </span>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="form-label">ชื่อสินค้า</label>
                <input type="text" className="form-control" name="product_name" value={formData.product_name} onChange={handleInputChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">หมวดสินค้า</label>
                <input type="text" className="form-control" name="category" value={formData.category} onChange={handleInputChange} required />
              </div>
              <div className="col-md-2">
                <label className="form-label">ราคา</label>
                <input type="number" step="0.01" className="form-control" name="price" value={formData.price} onChange={handleInputChange} required />
              </div>
              <div className="col-md-3 d-flex gap-2">
                {/* ❗️ 8. อัปเดตปุ่ม Submit ให้มี Spinner */}
                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    <span className="icon-text-btn">
                      {isEditing ? <RiRefreshLine /> : <RiAddFill />}
                      {isEditing ? 'อัปเดต' : 'เพิ่มสินค้า'}
                    </span>
                  )}
                </button>
                {isEditing && (
                  <button type="button" className="btn btn-secondary" onClick={resetForm} disabled={isSubmitting}>
                    ยกเลิก
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* (ส่วนของตารางเหมือนเดิม) */}
      <div className="card">
        <div className="card-body p-0"> 
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th style={{paddingLeft: '1.5rem'}}>ID</th>
                  <th>ชื่อสินค้า</th>
                  <th>หมวดหมู่</th>
                  <th>ราคา (บาท)</th>
                  <th style={{paddingRight: '1.5rem'}}>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {/* ❗️ (เพิ่ม) ตรวจสอบว่ามีสินค้าหรือไม่ */}
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-muted">
                      ยังไม่มีข้อมูลสินค้า
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.product_id}>
                      <td style={{paddingLeft: '1.5rem'}}>{product.product_id}</td>
                      <td className="fw-bold">{product.product_name}</td>
                      <td>
                        <span className={`badge rounded-pill text-dark bg-${getCategoryColor(product.category)} bg-opacity-25 p-2`}>
                          {product.category}
                        </span>
                      </td>
                      <td>{parseFloat(product.price).toFixed(2)}</td>
                      <td style={{paddingRight: '1.5rem'}}>
                        <button onClick={() => handleEdit(product)} className="btn btn-warning btn-sm me-2">
                          <span className="icon-text-btn"><RiPencilFill /> แก้ไข</span>
                        </button>
                        <button onClick={() => handleDelete(product.product_id)} className="btn btn-danger btn-sm">
                          <span className="icon-text-btn"><RiDeleteBin6Fill /> ลบ</span>
                        </button>
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

export default ProductList;