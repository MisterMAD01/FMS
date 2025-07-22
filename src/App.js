import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home from "./Home";
import Post from "./Post";
import Profile from "./Profile";
function App() {
  return (
    <div className="App">
      <h1>My Website.</h1>
      <a
        className="App-link"
        href="https://www.google.co.th"
        target="_blank"
        rel="noopener noreferrer"
      >
        Link to Google.
      </a>
      <hr />
      <Router>
        <Link to="/" style={{ padding: 15, textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/Profile" style={{ padding: 15, textDecoration: "none" }}>
          Profile
        </Link>
        <Link to="/Post">Posts</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/Profile" element={<Profile />} />
          <Route exact path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
