import React, { useState } from "react";
import * as Mui from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { prodcutActions } from "../../store/actions/products";
import { AppDialog } from "../../components/appDialog";

const Product = ({ product, deleteProduct }) => {
  const [toggle, setToggle] = useState(false);
  const history = useHistory();

  return (
    <>
      <Mui.Card style={styles.card}>
        <Mui.CardMedia
          component="img"
          height="220"
          image={product.image[0]}
          alt={product.name}
        />
        <Mui.IconButton
          style={styles.editbtn}
          onClick={() => history.push(`/product/update/${product._id}`)}
        >
          <Edit />
        </Mui.IconButton>
        <div style={styles.container}>
          <Mui.Typography sx={{ fontSize: "1.2rem" }}>
            {product.name}
          </Mui.Typography>
          <Mui.Rating name="read-only" value={4.4 || product.rating} readOnly />
          <Mui.Typography
            sx={{ fontSize: "1rem" }}
            variant="body2"
            color="text.secondary"
          >
            {product.category}
          </Mui.Typography>
          <Mui.Typography variant="body2" color="text.secondary">
            {product.description}
          </Mui.Typography>
          <Mui.Box
            component="div"
            sx={{ display: "flex", alignItems: "baseline" }}
          >
            <div style={styles.offerPrice}>&#8377;{product.offerPrice}</div>
            <div style={styles.fixedPrice}>&#8377;{product.fixedPrice}</div>
          </Mui.Box>
        </div>
        <Mui.CardActions>
          <Mui.IconButton>
            <Visibility />
          </Mui.IconButton>
          <Mui.IconButton onClick={() => setToggle((prev) => !prev)}>
            <Delete />
          </Mui.IconButton>
          <AppDialog
            title="Do you want to delete this Product?"
            open={toggle}
            closeHandler={() => setToggle((prev) => !prev)}
            deleteHandler={() => {
              deleteProduct(product._id);
              setToggle((prev) => !prev);
            }}
          />
        </Mui.CardActions>
      </Mui.Card>
    </>
  );
};

const styles = {
  card: {
    position: "relative",
  },
  editbtn: {
    position: "absolute",
    top: "0.8rem",
    right: "0.8rem",
    color: "black",
    backgroundColor: "white",
  },
  offer: {
    position: "absolute",
    top: "180px",
    left: "0rem",
    padding: "0.2rem 0.8rem",
    fontSize: "0.96rem",
    color: "white",
    backgroundColor: "green",
    borderTopRightRadius: "6px",
    borderBottomRightRadius: "6px",
  },
  container: {
    margin: "0.8rem 0.8rem 0 0.8rem",
  },
  divider: {
    margin: "0 0.6rem",
  },
  offerPrice: {
    fontSize: "1.2rem",
    color: "#666666",
    marginRight: "0.4rem",
  },
  fixedPrice: {
    color: "#666666",
    textDecoration: "line-through",
  },
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (id) => dispatch(prodcutActions.deleteOne(id)),
  };
};

export default connect(null, mapDispatchToProps)(Product);
