import React, { useState, useEffect } from "react";

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost/php-react/show-query.php")
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          throw new Error("Oops, we haven't got JSON!");
        }
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (typeof data === "object" && data !== null) {
          // If data is an object, try to find an array property
          const arrayData = Object.values(data).find(Array.isArray);
          if (arrayData) {
            setOrders(arrayData);
          } else {
            throw new Error("Received data is not in expected format");
          }
        } else {
          throw new Error("Received data is not in expected format");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Order Dashboard
      </h1>

      {orders.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Customer Name</th>
              <th style={tableHeaderStyle}>Product Name</th>
              <th style={tableHeaderStyle}>Price</th>
              <th style={tableHeaderStyle}>Order Date</th>
              <th style={tableHeaderStyle}>Product ID</th>
              <th style={tableHeaderStyle}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td style={tableCellStyle}>{order.cust_name}</td>
                <td style={tableCellStyle}>{order.p_name}</td>
                <td style={tableCellStyle}>${order.p_price}</td>
                <td style={tableCellStyle}>
                  {new Date(order.order_date).toLocaleDateString()}
                </td>
                <td style={tableCellStyle}>{order.p_id}</td>
                <td style={tableCellStyle}>{order.order_qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No orders found</div>
      )}
    </div>
  );
};
const tableHeaderStyle = {
  backgroundColor: "#f2f2f2",
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};
const tableCellStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};
export default OrderDashboard;
