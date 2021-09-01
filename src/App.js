import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import { fetchAllRestaurants } from "./store/actions/RestaurantsActions";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import "./App.css";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import FoodsPage from "./pages/FoodsPage/FoodsPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import RestaurantsPage from "./pages/RestaurantsPage/RestaurantsPage";

function App(props) {
  const { fetchAllRestaurants } = props;

  useEffect(() => {
    fetchAllRestaurants();
  }, [fetchAllRestaurants]);
  return (
    <div className="App">
      <div className="App-Container">
        <SideNavBar />
        <div className="Pages">
          <Switch>
            <Route path="/" exact render={() => <HomePage />} />
            <Route path="/Orders" exact render={() => <OrdersPage />} />
            <Route path="/Foods" exact render={() => <FoodsPage />} />
            <Route path="/Products" exact render={() => <ProductsPage />} />
            <Route
              path="/Restaurants"
              exact
              render={() => <RestaurantsPage />}
            />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllRestaurants: () => dispatch(fetchAllRestaurants()),
  };
};

export default connect(null, mapDispatchToProps)(App);
