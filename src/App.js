import React from "react";

export default function App() {
  return (
    <div>
      {/* container ตัวอย่างแรก */}
      <div className="container text-success p-3 mt-3 mb-3">
        <div className="row justify-content-md-center">
          <div className="col-3 border p-3 bg-dark">1 of 3</div>
          <div className="col-md-auto border p-3 bg-dark">
            Variable width content
          </div>
          <div className="col-3 border p-3 bg-dark">3 of 3</div>
        </div>
        <div className="row mt-3">
          <div className="col border border-danger bg-secondary p-3">
            1 of 3
          </div>
          <div className="col-md-auto border border-danger bg-dark p-3">
            Variable width content
          </div>
          <div className="col col-lg-2 border p-3 bg-dark">3 of 3</div>
        </div>
      </div>

      <hr />

      {/* container-fluid ตัวอย่างที่สอง */}
      <div className="container-fluid mx-0">
        <div className="row text-white">
          <div className="col-3 border bg-dark">col3</div>
          <div className="col-6 border bg-dark">
            Id anim sunt aute eiusmod dolor. In amet velit cupidatat ex veniam
            proident dolor commodo. Tempor non proident adipisicing est Lorem
            enim in qui fugiat do reprehenderit qui voluptate.
          </div>
          <div className="col-3 border bg-dark text-right">
            Id anim sunt aute eiusmod dolor. In amet velit cupidatat ex veniam
            proident dolor commodo. Tempor non proident adipisicing est Lorem
            enim in qui fugiat do reprehenderit qui voluptate.
          </div>
        </div>
      </div>

      <hr />

      {/* ตัวอย่างสีพื้นฐาน 9 สี */}
      <div className="container mt-3">
        <div className="row text-white text-center">
          <div className="col p-3 bg-primary border">Primary</div>
          <div className="col p-3 bg-secondary border">Secondary</div>
          <div className="col p-3 bg-success border">Success</div>
          <div className="col p-3 bg-danger border">Danger</div>
          <div className="col p-3 bg-warning border text-dark">Warning</div>
          <div className="col p-3 bg-info border text-dark">Info</div>
          <div className="col p-3 bg-light border text-dark">Light</div>
          <div className="col p-3 bg-dark border">Dark</div>
          <div className="col p-3 bg-white border text-dark">White</div>
        </div>
      </div>

      <hr />

      {/* ข้อความหัวข้อสีและขนาด */}
      <div className="container mt-3">
        <h1 className="text-danger">สมุดบัญชีรายรับ-รายจ่าย</h1>
        <h1 style={{ fontSize: 30 }}>สมุดบัญชีรายรับ-รายจ่าย</h1>
      </div>

      <hr />

      {/* ข้อความ Lorem Ipsum ตัวอย่าง */}
      <div className="container">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}
