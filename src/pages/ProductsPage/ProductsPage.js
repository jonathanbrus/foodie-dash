import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { connect } from "react-redux";

import { fetchProducts } from "../../store/actions/ProductsActions";

import classes from "./ProductsPage.module.css";
import AddProduct from "./AddProduct/AddProduct";
import AllProducts from "./AllProducts/AllProducts";

import SearchBar from "../../components/UI/SearchBar/SearchBar";
import DrowpDownSelection from "../../components/UI/DropDownSelection/DropDownSelection";
import AddButton from "../../components/UI/AddButton/AddButton";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

const cats = [
  { id: 1, value: "groceries", name: "Groceries" },
  { id: 2, value: "cosmetics", name: "Cosmetics" },
  { id: 3, value: "mobileAccessories", name: "Mobile Accessories" },
  { id: 4, value: "accessories", name: "Accessories" },
  { id: 5, value: "kidsSection", name: "Kid's Section" },
  { id: 6, value: "gifts", name: "Gifts" },
];

const ProductsPage = (props) => {
  const { fetchProducts } = props;
  const [toggle, setToggle] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [selectedProd, setSelectedProd] = useState(null);

  const addProduct = () => {
    if (Object.keys(selectedCategory).length > 0) {
      setSelectedProd(null);
      setToggle((prev) => !prev);
    }
  };

  const editProduct = (product) => {
    setSelectedProd(product);
    setToggle(true);
  };

  useEffect(() => {
    if (Object.keys(selectedCategory).length > 0) {
      fetchProducts(selectedCategory.value);
    }
  }, [fetchProducts, selectedCategory]);

  return (
    <div className={classes.otherProductsPage}>
      <AnimatePresence>
        {toggle ? (
          <Backdrop onClick={() => setToggle(false)}>
            <AddProduct
              category={selectedCategory.value}
              setSelectedProd={() => setSelectedProd(null)}
              switchToggle={() => {
                setToggle(false);
              }}
              productData={selectedProd ? selectedProd : null}
            />
          </Backdrop>
        ) : null}
      </AnimatePresence>
      <div className={classes.Header}>
        <SearchBar
          onChange={(search) => setSearch(search)}
          placeholder="Search By Name"
        />
        <div className={classes.DropDownFilter}>
          <DrowpDownSelection
            Items={cats}
            setSelection={(selected) => setSelectedCategory(selected)}
            placeHolder={"Select Category"}
          />
        </div>
        <div style={{ flex: 1 }}>
          Total Products: {props.allProducts ? props.allProducts.length : 0}
        </div>
        <AddButton title="Add Product" onClick={addProduct} />
      </div>
      <AllProducts
        editProduct={editProduct}
        AllProducts={
          search.length > 0
            ? props.allProducts.filter(
                (food) =>
                  food.name.toLowerCase().includes(search.toLowerCase()) && food
              )
            : props.allProducts
        }
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.Products.AllProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (category) => dispatch(fetchProducts(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
