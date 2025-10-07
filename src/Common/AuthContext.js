// src/Common/AuthContext.js (ส่วนที่แก้ไข)

import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // ฟังก์ชันสำหรับจำลองการล็อกอิน
  const login = (username, password) => {
    setIsLoggedIn(false); // Reset ก่อน
    setUser(null);

    let role = "customer"; // บทบาทเริ่มต้น

    // 1. 🚨 ตรวจสอบสำหรับผู้ดูแล/แม่ค้า (Admin/Seller) 🚨
    if (username === "admin" && password === "1234") {
      role = "admin";
      setIsLoggedIn(true);
      setUser({ username: username, role: role });
      alert(`เข้าสู่ระบบสำเร็จ: ยินดีต้อนรับแม่ค้า/ผู้ดูแล ${username}`);
      return true;
    }

    // 2. 👥 ตรวจสอบสำหรับลูกค้าทั่วไป (Customer) 👥
    else if (username === "customer" && password === "4321") {
      // สามารถเพิ่ม Username/Password อื่นๆ สำหรับลูกค้าทั่วไปได้
      role = "customer";
      setIsLoggedIn(true);
      setUser({ username: username, role: role });
      alert(`เข้าสู่ระบบสำเร็จ: ยินดีต้อนรับลูกค้า ${username}`);
      return true;
    }

    // 3. ❌ ไม่สำเร็จ
    else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง");
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    alert("ออกจากระบบเรียบร้อย");
  };

  // ✅ เพิ่มการส่ง user และบทบาทออกไปด้วย
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
