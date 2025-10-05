// src/Common/Welcome.js

import React from "react";

const Welcome = () => {
  return (
    <header className="jumbotron hero-spacer p-5 my-4 bg-light rounded-3">
      <h1 className="display-4 text-danger">ยินดีต้อนรับสู่ RedMart!</h1>
      <p>
        แหล่งรวมสินค้าคุณภาพดี ราคาประหยัด พร้อมโปรโมชั่นสุดพิเศษ ช้อปสะดวก
        ส่งเร็วทันใจ!
      </p>
      <p>
        <a href="#" className="btn btn-danger btn-lg">
          ดูโปรโมชั่นพิเศษ!
        </a>
      </p>
    </header>
  );
};

export default Welcome;
