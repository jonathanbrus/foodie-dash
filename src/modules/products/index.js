import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import { Add } from "@mui/icons-material";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Masonry from "react-masonry-css";

import { prodcutActions } from "../../store/actions/products";
import { productTypes } from "../../store/actions/actionTypes";
import { AppBar } from "../../components/appBar";
import { Loader } from "../../components/ui/loader";
import Product from "./product";
import classes from "./index.module.css";
import SearchBar from "../../components/ui/searchBar/searchBar";

const ProductsPage = ({
  getProducts,
  allProducts,
  category,
  selectCategory,
  editProduct,
}) => {
  const history = useHistory();

  const [search, setSearch] = useState("");

  const addProduct = () => {
    history.push(`/product/create/${category}`);
  };

  useEffect(() => {
    getProducts(category);
  }, [getProducts, category]);

  let filteredProducts =
    search.length > 0
      ? allProducts.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      : allProducts;

  const breakPoints = {
    default: 3,
    1150: 2,
    850: 1,
  };

  return (
    <div className={classes.otherProductsPage}>
      <AppBar>
        <Mui.FormControl margin="dense" size="small">
          <Mui.InputLabel id="label">Categories</Mui.InputLabel>
          <Mui.Select
            labelId="label"
            label="Categories"
            MenuProps={{ PaperProps: { sx: { maxHeight: 260 } } }}
            value={category}
            onChange={(e) => selectCategory(e.target.value)}
          >
            {selectmenus.map((menu) => (
              <Mui.MenuItem key={menu.filter} value={menu.filter}>
                {menu.title}
              </Mui.MenuItem>
            ))}
          </Mui.Select>
        </Mui.FormControl>
        <Mui.IconButton onClick={addProduct}>
          <Add />
        </Mui.IconButton>
      </AppBar>
      <SearchBar
        value={search}
        setValue={setSearch}
        placeholder="Search by name"
      />
      <div>
        {allProducts.length > 0 ? (
          <Masonry
            breakpointCols={breakPoints}
            className={classes.myMasonryGrid}
            columnClassName={classes.myMasonryGrid_column}
          >
            {filteredProducts.map((product, index) => (
              <Product
                key={index}
                product={product}
                editProduct={() => editProduct(product)}
              />
            ))}
          </Masonry>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

const selectmenus = [
  { filter: "groceries", title: "Groceries" },
  { filter: "fruits", title: "Fruits" },
  { filter: "vegetables", title: "Vegetables" },
  { filter: "meat", title: "Meat" },
  { filter: "homemade", title: "Homemade" },
  { filter: "gifts", title: "Gifts" },
  { filter: "headphones", title: "Headphones" },
  { filter: "mobilecases", title: "Mobile Cases" },
  { filter: "cosmetics", title: "Cosmetics" },
  { filter: "offer1", title: "Offer Zone 1" },
  { filter: "offer2", title: "Offer Zone 2" },
  { filter: "offer3", title: "Offer Zone 3" },
];

const mapStateToProps = (state) => {
  return {
    allProducts: state.Products.products,
    category: state.Products.selectedCategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory: (category) =>
      dispatch({ type: productTypes.selectCategory, payLoad: category }),
    getProducts: (category) => dispatch(prodcutActions.get(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
