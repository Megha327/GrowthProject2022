import {ADD_TO_CART, FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE} from "./Types";

export const fetchProducts = () => (dispatch) => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .catch((err) =>
        fetch("data.json")
          .then((res) => res.json())
          .then((data) => data.products)
      )
      .then((data) => {
        dispatch({ type: FETCH_PRODUCTS, payload: data });
      });
};

export const filterProducts = (products, size) => (dispatch) => {
    dispatch({
      type: FILTER_PRODUCTS_BY_SIZE,
      payload: {
        size: size,
        items:
          size === ""
            ? products
            : products.filter(
                (x) => x.availableSizes.indexOf(size.toUpperCase()) >= 0
              ),
      },
    });
};


export const sortProducts = (items, sort) => (dispatch) => {
    const products = items.slice();
    if(sort != ""){
        console.log("not ull sort..");
        products.sort((a,b) => (sort === "lowestprice") ? (a.price > b.price ? 1 : -1) : (a.price < b.price ? 1 : -1))
    }else{
        products.sort((a,b) => (a.id < b.id ? 1 : -1));
    }
    dispatch({
      type: ORDER_PRODUCTS_BY_PRICE,
      payload: {
        sort: sort,
        items: products,
      },
    });
};

export const addToCart = (items, product) => (dispatch) => {
    const cartItems = items.slice();
    let productAlreadyInCart = false;
  
    cartItems.forEach((cp) => {
      if (cp.id === product.id) {
        cp.count += 1;
        productAlreadyInCart = true;
      }
    });
  
    if (!productAlreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch({ type: ADD_TO_CART, payload: { cartItems: cartItems } });
  };
  