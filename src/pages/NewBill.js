// src/pages/NewBill.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiBillLine, RiShoppingCart2Line, RiAddCircleFill, RiDeleteBin7Fill, RiCheckFill } from "react-icons/ri";

// ❗️ 1. รายชื่ออำเภอ
const NARATHIWAT_DISTRICTS = [
  'เมืองนราธิวาส', 'ตากใบ', 'บาเจาะ', 'ยี่งอ', 'ระแงะ', 'รือเสาะ',
  'ศรีสาคร', 'แว้ง', 'สุคิริน', 'สุไหงโก-ลก', 'สุไหงปาดี', 'จะแนะ', 'เจาะไอร้อง'
];

// ❗️ 2. (เพิ่มใหม่) รายการโปรโมชั่น
const PROMOTION_LIST = [
  'ไม่มี',
  'ส่วนลด All Member',
  'จับคู่สุดคุ้ม',
  'ซื้อ 2 แถม 1',
  'แลกซื้อ',
  'ส่วนลด 5 บาท',
  'ส่วนลด 10 บาท'
];

const SALES_API_URL = 'http://fms.pnu.ac.th/Mistermad02/Backend/sales_api.php';
const PRODUCTS_API_URL = 'http://fms.pnu.ac.th/Mistermad02/Backend/products_api.php';

function NewBill() {
  const [products, setProducts] = useState([]); 
  const [cart, setCart] = useState([]); 
  const [totalAmount, setTotalAmount] = useState(0);

  // ❗️ 3. อัปเดต State เริ่มต้น
  const [header, setHeader] = useState({
    bill_date: new Date().toISOString().split('T')[0],
    bill_time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    province: 'นราธิวาส',
    district: NARATHIWAT_DISTRICTS[0],
    payment_type: 'เงินสด',
    promotion: PROMOTION_LIST[0], // ❗️ ใช้ค่าเริ่มต้นจาก List
    customer_type: 'ทั่วไป'
  });
  const [cartItem, setCartItem] = useState({ product_id: '', quantity: 1 });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(PRODUCTS_API_URL);
      setProducts(response.data);
      if (response.data.length > 0) {
        setCartItem({ ...cartItem, product_id: response.data[0].product_id });
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalAmount(total);
  }, [cart]);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeader({ ...header, [name]: value });
  };

  const handleCartItemChange = (e) => {
    const { name, value } = e.target;
    setCartItem({ ...cartItem, [name]: value });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    const selectedProduct = products.find(p => p.product_id == cartItem.product_id);
    if (!selectedProduct || cartItem.quantity <= 0) return;
    const existingItem = cart.find(item => item.product_id == selectedProduct.product_id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.product_id == selectedProduct.product_id
          ? { ...item, quantity: item.quantity + parseInt(cartItem.quantity) }
          : item
      ));
    } else {
      setCart([...cart, {
        ...selectedProduct,
        quantity: parseInt(cartItem.quantity)
      }]);
    }
  };

  const handleRemoveFromCart = (product_id) => {
    setCart(cart.filter(item => item.product_id !== product_id));
  };

  const handleSubmitBill = async () => {
    if (cart.length === 0) {
      alert("กรุณาเพิ่มสินค้าลงในตะกร้า");
      return;
    }
    const billData = {
      header: { ...header, total_amount: totalAmount },
      details: cart.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      }))
    };
    try {
      const response = await axios.post(SALES_API_URL, billData);
      alert(response.data.message || 'บันทึกบิลสำเร็จ!');
      setCart([]);
      // ❗️ 4. อัปเดตการ Reset ค่า
      setHeader({
        ...header,
        bill_date: new Date().toISOString().split('T')[0],
        bill_time: new Date().toTimeString().split(' ')[0].substring(0, 5),
        district: NARATHIWAT_DISTRICTS[0],
        promotion: PROMOTION_LIST[0], // ❗️ Reset โปรโมชั่น
        payment_type: 'เงินสด',
        customer_type: 'ทั่วไป'
      });
    } catch (error) {
      console.error("Error submitting bill:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกบิล");
    }
  };

  return (
    <div>
      <h1 className="mb-4">บันทึกบิลใหม่</h1>
      
      <div className="card mb-4">
        <div className="card-header">
          <span className="icon-text"><RiBillLine /> ข้อมูลบิล (Bill Header)</span>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">วันที่</label>
              <input type="date" className="form-control" name="bill_date" value={header.bill_date} onChange={handleHeaderChange} />
            </div>
            <div className="col-md-3">
              <label className="form-label">เวลา</label>
              <input type="time" className="form-control" name="bill_time" value={header.bill_time} onChange={handleHeaderChange} />
            </div>
            <div className="col-md-3">
              <label className="form-label">จังหวัด</label>
              <input 
                type="text" 
                className="form-control" 
                name="province" 
                value={header.province} 
                disabled 
                readOnly
                style={{ backgroundColor: '#e9ecef' }}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">อำเภอ</label>
              <select 
                className="form-select" 
                name="district" 
                value={header.district} 
                onChange={handleHeaderChange}
              >
                {NARATHIWAT_DISTRICTS.map(district => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">ประเภทการชำระเงิน</label>
              <select className="form-select" name="payment_type" value={header.payment_type} onChange={handleHeaderChange}>
                <option value="เงินสด">เงินสด</option>
                <option value="TrueMoney Wallet">TrueMoney Wallet</option>
                <option value="บัตรเครดิต">บัตรเครดิต</option>
              </select>
            </div>
            
            {/* ❗️ 5. (แก้ไข) เปลี่ยน Input เป็น Dropdown */}
            <div className="col-md-4">
              <label className="form-label">โปรโมชั่น</label>
              <select 
                className="form-select" 
                name="promotion" 
                value={header.promotion} 
                onChange={handleHeaderChange}
              >
                {PROMOTION_LIST.map(promo => (
                  <option key={promo} value={promo}>
                    {promo}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-4">
              <label className="form-label">ประเภทลูกค้า</label>
              <select className="form-select" name="customer_type" value={header.customer_type} onChange={handleHeaderChange}>
                <option value="ทั่วไป">ทั่วไป</option>
                <option value="สมาชิก All Member">สมาชิก All Member</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* --- ส่วนที่เหลือของไฟล์ (Shopping Cart, ฯลฯ) เหมือนเดิม --- */}
      
      <div className="card mb-4">
        <div className="card-header">
          <span className="icon-text"><RiShoppingCart2Line /> รายการสินค้า (Shopping Cart)</span>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddToCart}>
            <div className="row g-2 align-items-end">
              <div className="col-md-7">
                <label className="form-label">เลือกสินค้า</label>
                <select className="form-select" name="product_id" value={cartItem.product_id} onChange={handleCartItemChange}>
                  {products.map(p => (
                    <option key={p.product_id} value={p.product_id}>
                      {p.product_name} ({p.price} บาท)
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">จำนวน</label>
                <input type="number" className="form-control" name="quantity" min="1" value={cartItem.quantity} onChange={handleCartItemChange} />
              </div>
              <div className="col-md-2 d-grid">
                <button type="submit" className="btn btn-primary">
                  <span className="icon-text-btn"><RiAddCircleFill /> เพิ่ม</span>
                </button>
              </div>
            </div>
          </form>

          <table className="table mt-4">
            <thead>
              <tr>
                <th>สินค้า</th>
                <th>ราคาต่อหน่วย</th>
                <th>จำนวน</th>
                <th>ราคารวม</th>
                <th>ลบ</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.product_id}>
                  <td className="fw-bold">{item.product_name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemoveFromCart(item.product_id)} className="btn btn-danger btn-sm">
                      <RiDeleteBin7Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h2 className="mb-0">ยอดรวม: <span className="fw-bold text-success">{totalAmount.toFixed(2)} ฿</span></h2>
          <button onClick={handleSubmitBill} className="btn btn-primary btn-lg" style={{ minWidth: '200px' }}>
            <span className="icon-text-btn"><RiCheckFill /> บันทึกบิล</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewBill;