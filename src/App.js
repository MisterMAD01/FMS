// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import BillList from './pages/BillList';
import ProductList from './pages/ProductList';
import NewBill from './pages/NewBill';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4 mb-5">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bills" element={<BillList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/new-bill" element={<NewBill />} />
        </Routes>
      </div>

      {/* ❗️❗️ --- เพิ่มส่วน Footer ตรงนี้ --- ❗️❗️ */}
      <footer className="app-footer">
        <p className="mb-0">
          มูฮัมหมัด มะเซ็ง 6560506027
        </p>
        <p className="mb-0">
          สาขาวิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยนราธิวาสราชครินทร์
        </p>
      </footer>
      {/* ❗️❗️ --- สิ้นสุดส่วน Footer --- ❗️❗️ */}
    </>
  );
}

export default App;