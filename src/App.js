// src/App.js

import React from "react";
import Calculator from "./Calculator";
import "./App.css";

function App() {
  const numberA = 100;
  const numberB = 25;

  return (
    <div className="App">
      <h1>เครื่องคิดเลขแบบ React Props</h1>
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
