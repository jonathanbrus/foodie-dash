import React from "react";

import Product from "../../../components/Product/product";
import classes from "./AllProducts.module.css";

const AllProducts = (props) => {
  const { AllProducts } = props;

  return AllProducts.length > 0 ? (
    <div className={classes.AllProducts}>
      {AllProducts.map((product, index) => (
        <Product
          key={index}
          product={product}
          editProduct={() => props.editProduct(product)}
        />
      ))}
    </div>
  ) : (
    <div className={classes.Empty}>Select a Category</div>
  );
};

export default AllProducts;
