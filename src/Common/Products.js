// src/Common/Products.js

import React from "react";
import ProductsItem from "./ProductsItem";

const Products = (props) => {
  const { title, products } = props;

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <h3 className="my-4 text-danger">{title}</h3>
        </div>
      </div>

      <div className="row text-center">
        {products.map((product, index) => {
          return <ProductsItem {...product} key={product.name + index} />;
        })}
      </div>
    </div>
  );
};

export default Products;
