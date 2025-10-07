// src/Common/ProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ element: Component }) => {
  const { isLoggedIn, user } = useAuth(); // ดึง user มาตรวจสอบ role

  // 🌟 ตรวจสอบสิทธิ์: ต้องล็อกอิน และต้องมี role เป็น 'admin' เท่านั้น
  const isAuthorized = isLoggedIn && user && user.role === "admin";

  if (!isAuthorized) {
    // 🛑 ถ้าไม่ใช่ Admin ให้แจ้งเตือนและส่งไปหน้าหลัก หรือหน้า Login
    alert("ขออภัย, หน้านี้สำหรับผู้ดูแลระบบเท่านั้น");

    // ถ้าล็อกอินแล้วแต่ไม่ใช่ admin ให้ไปหน้าหลัก, ถ้ายังไม่ล็อกอิน ให้ไปหน้า login
    return <Navigate to={isLoggedIn ? "/" : "/login"} replace />;
  }

  // ✅ ถ้าเป็น Admin ให้แสดง Component ที่ต้องการ
  return <Component />;
};

export default ProtectedRoute;
