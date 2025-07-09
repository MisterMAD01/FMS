import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
const Footer = () => {
  return (
    <div>
      <Navbar bg="primary" variant="dark" fixed="bottom">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="IMG_1294.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            React Bootstrap
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};
export default Footer;
