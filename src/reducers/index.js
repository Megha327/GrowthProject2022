import { combineReducers } from "redux";
import productReducers from "./ProductReducers";
import cartReducers from "./CartReducer";

export default combineReducers({
  products: productReducers,
  cart: cartReducers,
});