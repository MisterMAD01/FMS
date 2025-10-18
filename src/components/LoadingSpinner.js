// src/components/LoadingSpinner.js
import React from 'react';

function LoadingSpinner() {
  return (
    // นี่คือดีไซน์ไอคอนหมุนของ Bootstrap
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh' // ทำให้มันอยู่กลางๆ หน้าจอ
    }}>
      <div 
        className="spinner-border text-success" // 'text-success' คือสีเขียว
        style={{ width: '3rem', height: '3rem' }} 
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;