import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Content = () => {
  return (
    <>
      {/* ส่วน Jumbotron */}
      <div className="container mt-3">
        <h2>ตัวอย่าง Jumbotron</h2>
        <div className="mt-4 p-5 bg-primary text-white rounded">
          <h1>ยินดีต้อนรับ!</h1>
          <p>
            นี่คือตัวอย่างของ Jumbotron
            ที่ใช้เพื่อแสดงข้อความนำหรือหัวข้อสำคัญในเว็บไซต์ของคุณ
          </p>
        </div>
        <br />
      </div>

      {/* ส่วนการ์ดแต่ละใบ */}
      <div className="flex-container">
        <div>
          <Card>
            <Card.Img
              variant="top"
              src="IMG_1294.jpg"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>การ์ดใบที่ 2</Card.Title>
              <Card.Text>รายละเอียดของการ์ดใบที่สองอยู่ตรงนี้</Card.Text>
              <Button variant="primary">ดูข้อมูล</Button>
            </Card.Body>
          </Card>
        </div>

        <div>
          <Card>
            <Card.Img
              variant="top"
              src="IMG_1294.jpg"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>การ์ดใบที่ 3</Card.Title>
              <Card.Text>นี่เป็นการ์ดอีกใบที่คุณสามารถแก้ไขได้</Card.Text>
              <Button variant="primary">รายละเอียด</Button>
            </Card.Body>
          </Card>
        </div>

        <div>
          <Card>
            <Card.Img
              variant="top"
              src="IMG_1294.jpg"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>การ์ดใบที่ 4</Card.Title>
              <Card.Text>
                เพิ่มข้อมูลสินค้า บริการ หรือโปรไฟล์ได้ที่นี่
              </Card.Text>
              <Button variant="primary">เพิ่มเติม</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* Jumbotron ปิดท้าย (เลือกใส่หรือไม่ก็ได้) */}
      <div className="container mt-3">
        <h2>ตัวอย่าง Jumbotron</h2>
        <div className="mt-4 p-5 bg-primary text-white rounded">
          <h1>ขอบคุณที่เข้าชม</h1>
          <p>
            หากต้องการข้อมูลเพิ่มเติม กรุณาติดต่อเราผ่านช่องทางต่หาง ๆ
            บนเว็บไซต์
          </p>
        </div>
        <br />
      </div>
    </>
  );
};

export default Content;
