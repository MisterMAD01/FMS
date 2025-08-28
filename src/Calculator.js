// src/Calculator.js

import React from "react";
import "./Calculator.css";

const Calculator = ({ a, b, operation }) => {
  let result;
  let operationSymbol;
  let operationName;

  // ใช้ switch เพื่อเลือกการคำนวณตามค่า operation
  switch (operation) {
    case "add":
      result = a + b;
      operationSymbol = "+";
      operationName = "บวก";
      break;
    case "subtract":
      result = a - b;
      operationSymbol = "−";
      operationName = "ลบ";
      break;
    case "multiply":
      result = a * b;
      operationSymbol = "×";
      operationName = "คูณ";
      break;
    case "divide":
      if (b === 0) {
        result = "ไม่สามารถหารด้วย 0 ได้";
      } else {
        result = a / b;
      }
      operationSymbol = "÷";
      operationName = "หาร";
      break;
    case "mod":
      result = a % b;
      operationSymbol = "%";
      operationName = "มอด (เศษ)";
      break;
    default:
      result = "ไม่รองรับการคำนวณนี้";
      operationSymbol = "?";
      operationName = "ไม่ทราบ";
  }

  return (
    <div className="calculator-card">
      <div className="calculator-header">
        <h2>{operationName}</h2>
      </div>
      <div className="calculator-body">
        <p className="expression">
          {a} {operationSymbol} {b}
        </p>
        <div className="divider"></div>
        <p className="result-text">= {result}</p>
      </div>
    </div>
  );
};

export default Calculator;
