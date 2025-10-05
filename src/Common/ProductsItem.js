// src/Common/ProductsItem.js

import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductsItem = (props) => {
  const { name, price, image } = props;
  const { addToCart } = useContext(CartContext);

  const handleBuyNow = () => {
    addToCart({ name, price, image });
    alert(`เพิ่ม "${name}" (฿${price}) ลงในตะกร้าแล้ว!`);
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 hero-feature mb-4">
      <div className="card h-100 shadow-sm border-danger border-2">
        <img
          src={image}
          alt={name}
          className="card-img-top"
          style={{ height: "180px", objectFit: "cover" }}
        />

        <div className="caption card-body d-flex flex-column justify-content-between">
          <div>
            <h4 className="card-title">{name}</h4>
            <p className="price fw-bold text-danger">ราคา ฿{price}</p>
          </div>

          <p className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleBuyNow}
            >
              <i className="fas fa-cart-plus me-1"></i> ซื้อเลย!
            </button>
            <a href="#" className="btn btn-default btn-outline-secondary">
              รายละเอียด
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsItem;
