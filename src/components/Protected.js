import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Protected = () => {
  const { user } = useAuth();
  if (!user) {
    // Redirect or handle unauthorized access
    return <p>Unauthorized Access</p>;
  }
  return (
    <div>
      <h2>Protected Page</h2>
      <Outlet />
    </div>
  );
};
export default Protected;
