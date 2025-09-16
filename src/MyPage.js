import React from "react";
import { useLocation } from "react-router-dom";
const MyPage = () => {
  const location = useLocation();
  const userEmail = location.state ? location.state.userEmail : null;
  return (
    <div>
      <h1>My Page</h1>
      {userEmail && <p>Welcome, {userEmail}!</p>}
      {/* Rest of your MyPage component */}
    </div>
  );
};
export default MyPage;
