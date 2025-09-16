import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./AuthContext";
import Home from "./Home"; // สร้าง component Home

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* เพิ่ม route อื่น ๆ ตามต้องการ */}
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
