import React, { Component } from 'react'
import { Provider } from "react-redux";
import Basket from './compopnents/Basket';
import Filter from './compopnents/Filter';
import Products from './compopnents/Products';
import store from "./store";

class App extends Component {

  componentWillMount(){
    if(localStorage.getItem('cartItems')){
      this.setState({
          cartItems: JSON.parse(localStorage.getItem('cartItems'))
      })
    }
  }

  render() {
    return (
      <Provider store = {store}>
        <div className="container">
          <h1>E-commerce Shopping Cart Application</h1>
          <hr />
          <div className="row">
            <div className="col-md-9">
              <Filter />
              <hr />
              <Products />
            </div>
            <div className="col-md-3">
              <Basket />
            </div>
          </div>
        </div>
      </Provider>
    )
  }
}

export default App;