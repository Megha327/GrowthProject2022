import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";


const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initState = { cart: { items: cartItems } };
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    initState,
    composeEnhancer(applyMiddleware(thunk))
  );
  export default store;
