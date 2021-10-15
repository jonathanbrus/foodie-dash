import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { AppLayout } from "./layout";
import "./index.css";

// Pages
import Orders from "./modules/orders";
import Restaurants from "./modules/restaurants";
import Foods from "./modules/foods";
import Products from "./modules/products";
import RestaurantForm from "./modules/restaurants/form";
import FoodForm from "./modules/foods/form";
import ProductForm from "./modules/products/form";

function App() {
  return (
    <div className="App">
      <AppLayout>
        <Switch>
          <Route path="/" exact>
            <Orders />
          </Route>
          <Route path="/restaurants" exact>
            <Restaurants />
          </Route>
          <Route path="/foods/:restaurantId" exact>
            <Foods />
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/foods/create/:restaurantId" exact>
            <FoodForm />
          </Route>
          <Route path="/foods/update/:restaurantId/:foodId" exact>
            <FoodForm />
          </Route>
          <Route path="/restaurant/create" exact>
            <RestaurantForm />
          </Route>
          <Route path="/restaurant/update/:restaurantId" exact>
            <RestaurantForm />
          </Route>
          <Route path="/product/create/:category" exact>
            <ProductForm />
          </Route>
          <Route path="/product/update/:productId" exact>
            <ProductForm />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      </AppLayout>
    </div>
  );
}

export default App;
