import React from "react";
import Home from "./Home";
import Profile from "./Profile";
import Posts from "./Posts";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { BrowserRouter as Switch } from "react-router-dom";
import "./App.css";
const App = () => (
  <div className="App">
    <h1>My React Router dom. </h1>
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Posts">All Posts</Link>
        </li>
        <li>
          <Link to="/Profile">User Profile</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Posts" element={<Posts />} />
        <Route path="/Profile" element={<Profile />} />
        <Route exact path="/Home" element={<Home />} />
      </Routes>
    </Router>
  </div>
);
export default App;
