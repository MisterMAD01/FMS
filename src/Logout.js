import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ล้าง token หรือข้อมูล session ของผู้ใช้ ถ้ามี
    // localStorage.removeItem("authToken");

    // อัปเดต state ให้เป็น logged out
    setLoggedIn(false);

    // นำผู้ใช้ไปยังหน้า login
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
