import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
export default function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost/php-react/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLoggedIn(true);
          // navigate("/MyPage");
          navigate("/MyPage", { state: { userEmail: loginEmail } });
        } else {
          alert("Login failed. Check your credentials.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <>
      <div>
        <form>
          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          <br />
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    </>
  );
}
