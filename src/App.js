import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        สินค้า FakeStore
      </h2>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "25px",
          justifyContent: "center",
        }}
      >
        {data.map((item) => (
          <li
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
              width: "230px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
              backgroundColor: "#fff",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={item.image}
              alt={`Product: ${item.title}`}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
                marginBottom: "12px",
              }}
            />
            <h3
              style={{
                fontSize: "16px",
                minHeight: "48px",
                marginBottom: "8px",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                color: "#fff",
                backgroundColor: "#007bff",
                borderRadius: "8px",
                padding: "2px 6px",
                fontSize: "12px",
                display: "inline-block",
                marginBottom: "8px",
              }}
            >
              {item.category}
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "16px", margin: "5px 0" }}
            >
              ${item.price}
            </p>
            <p style={{ color: "#555", fontSize: "14px" }}>
              ⭐ {item.rating.rate} ({item.rating.count})
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
