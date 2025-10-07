// src/App.js

import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// นำเข้า Context และ Component
import { CartProvider } from "./Common/CartContext";
import { AuthProvider } from "./Common/AuthContext";
import { ProductProvider } from "./Common/ProductContext";
import Navbars from "./Common/Navbars";
import Content from "./Common/Content";
import Footer from "./Common/Footer";
import Cart from "./Common/Cart";
import ProductsPage from "./Common/ProductsPage";
import LoginPage from "./Common/LoginPage";
import AddProductPage from "./Common/AddProductPage";
import ProtectedRoute from "./Common/ProtectedRoute";
import ProductManagementPage from "./Common/ProductManagementPage"; // ✅ นำเข้า Component ใหม่

// 404 Component
const NotFound = () => (
  <div className="container text-center mt-5 p-5" style={{ minHeight: "60vh" }}>
    <h1 className="display-1 text-danger">404</h1>
    <h3 className="mb-4">ไม่พบหน้านี้</h3>
    <p>ขออภัย, ที่อยู่ที่คุณค้นหาไม่ถูกต้อง</p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <div className="App">
              <Navbars />

              <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* 🔒 Protected Route: หน้าเพิ่มสินค้า */}
                <Route
                  path="/add-product"
                  element={<ProtectedRoute element={AddProductPage} />}
                />

                {/* 🔒 Protected Route: หน้าจัดการสินค้า (ใหม่) */}
                <Route
                  path="/manage-products"
                  element={<ProtectedRoute element={ProductManagementPage} />}
                />

                <Route path="*" element={<NotFound />} />
              </Routes>

              <Footer />
            </div>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
