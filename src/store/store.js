import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { OrdersReducer } from "./reducers/OrdersReducer";
import { FoodsReducer } from "./reducers/FoodsReducer";
import { ProductsReducer } from "./reducers/ProductsReducer";
import { RestaurantsReducer } from "./reducers/RestaurantsReducer";

const middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const RootReducer = combineReducers({
  Orders: OrdersReducer,
  Foods: FoodsReducer,
  Products: ProductsReducer,
  Restaurants: RestaurantsReducer,
});

export const Store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
