import React from "react";
import { connect } from "react-redux";

import { deleteProduct } from "../../store/actions/ProductsActions";
import classes from "./Product.module.css";

const Product = (props) => {
  const { product } = props;

  return (
    <div className={classes.Product}>
      <div
        className={classes.Image}
        style={{ backgroundImage: `url(${product.image[0]})` }}
      ></div>
      <div className={classes.Details}>
        <div className={classes.NameContainer}>
          <div className={classes.Name}>{product.name}</div>
          <div className={classes.Rating}>{product.rating}</div>
        </div>
        <div className={classes.Description}>
          <span>Description:</span>
          {product.length > 20
            ? product.description.substring(0, 19) + "..."
            : product.description}
        </div>
        <div className={classes.Category}>
          <span>Category:</span>
          {product.subCategory}
        </div>
        <div className={classes.Price}>
          <span>Fixed Price:</span>
          Rs.{product.fixedPrice}
        </div>
        <div className={classes.Price}>
          <span>Offer Price:</span>
          Rs.{product.offerPrice}
        </div>
      </div>
      <div className={classes.CTAs}>
        <div className={classes.EditBtn} onClick={props.editProduct}>
          Edit
        </div>
        <div
          className={classes.DeleteBtn}
          onClick={() => props.deleteProduct(product._id)}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (prodId) => dispatch(deleteProduct(prodId)),
  };
};

export default connect(null, mapDispatchToProps)(Product);
