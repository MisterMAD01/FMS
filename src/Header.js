import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Home from "./Home";
import Posts from "./Posts";
import Profile from "./Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import { SocialIcon } from "react-social-icons";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Header = () => {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src="/images/Logo.png"
              alt="Logo"
              style={{ padding: 10, height: "70px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
            >
              <Nav>
                <Link to="/" style={{ padding: 15, textDecoration: "none" }}>
                  Home
                </Link>
                <Link
                  to="/Profile"
                  style={{ padding: 15, textDecoration: "none" }}
                >
                  Profile
                </Link>
                <Link
                  to="/Posts"
                  style={{ padding: 15, textDecoration: "none" }}
                >
                  Posts
                </Link>
              </Nav>
              <NavDropdown
                title="Link"
                id="navbarScrollingDropdown"
                style={{ padding: 7, textDecoration: "none" }}
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <SocialIcon
              network="instagram"
              url="https://www.instagram.com/"
              style={{ height: 30, width: 30, margin: 10 }}
            />
            <SocialIcon
              network="twitter"
              url="https://twitter.com/"
              style={{ height: 30, width: 30, margin: 10 }}
            />
            <SocialIcon
              network="google"
              url="https://www.google.com/"
              style={{ height: 30, width: 30, margin: 10 }}
            />
            <SocialIcon
              network="facebook"
              url="https://www.facebook.com/"
              style={{ height: 30, width: 30, margin: 10 }}
            />
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
            <Nav>
              <img className="App-avartar" src="/images/2.png" alt="Logo" />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Posts" element={<Posts />} />

          <Route path="/Profile" element={<Profile />} />
          <Route exact path="/Home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};
export default Header;
