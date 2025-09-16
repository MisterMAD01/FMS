import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import MyPage from "./MyPage";
import Register from "./Register";
import About from "./About";
const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/" style={{ padding: 15, textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/MyPage" style={{ padding: 15, textDecoration: "none" }}>
            My Page
          </Link>
          <Link to="/Logout" style={{ padding: 15, textDecoration: "none" }}>
            Logout
          </Link>

          <Link to="/Register" style={{ padding: 15, textDecoration: "none" }}>
            Register
          </Link>
          <Link to="/About" style={{ padding: 15, textDecoration: "none" }}>
            About
          </Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/MyPage" />
              ) : (
                <Login setLoggedIn={setLoggedIn} />
              )
            }
          />
          <Route
            path="/MyPage"
            element={isLoggedIn ? <MyPage /> : <Navigate to="/" />}
          />
          <Route
            path="/Logout"
            element={<Logout setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/Register"
            element={<Register setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/About"
            element={isLoggedIn ? <About /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
