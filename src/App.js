// src/App.js

import React, { useState } from "react";
import Calculator from "./Calculator";
import "./App.css";

function App() {
  // สร้าง state เพื่อเก็บค่าตัวเลข A และ B
  const [numberA, setNumberA] = useState("");
  const [numberB, setNumberB] = useState("");

  return (
    <div className="App">
      <h1>โปรแกรมเครื่องคิดเลข</h1>

      {/* เพิ่ม input fields เพื่อรับค่าจากผู้ใช้ */}
      <div className="input-container">
        <label htmlFor="numberA">ตัวเลขตัวที่ 1:</label>
        <input
          id="numberA"
          type="number"
          value={numberA}
          onChange={(e) => setNumberA(Number(e.target.value))}
        />
      </div>

      <div className="input-container">
        <label htmlFor="numberB">ตัวเลขตัวที่ 2:</label>
        <input
          id="numberB"
          type="number"
          value={numberB}
          onChange={(e) => setNumberB(Number(e.target.value))}
        />
      </div>

      <div className="calculator-container">
        <Calculator a={numberA} b={numberB} operation="add" />
        <Calculator a={numberA} b={numberB} operation="subtract" />
        <Calculator a={numberA} b={numberB} operation="multiply" />
        <Calculator a={numberA} b={numberB} operation="divide" />
        <Calculator a={numberA} b={numberB} operation="mod" />
      </div>
    </div>
  );
}

export default App;
