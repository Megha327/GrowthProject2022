import React, { Component } from 'react'
import Basket from './compopnents/Basket';
import Filter from './compopnents/Filter';
import Products from './compopnents/Products';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       products: [],
       filterProducts:[],
       sort: '',
       size: 0,
       cartItems : []
    }
  }

  componentWillMount(){
    fetch("http://localhost:8000/products/").then(res => res.json())
    .then(data => this.setState({
      products: data,
        filterProducts: data
    }))
    if(localStorage.getItem('cartItems')){
      this.setState({
          cartItems: JSON.parse(localStorage.getItem('cartItems'))
      })
    }
  }

  handleChangeSort = (e) => {
    console.log("calling sort")
    this.setState({
          sort: e.target.value,
      })
      this.listProduct();
  }

  handleChangeSize = (e) => {
      this.setState({
          size: e.target.value,
      })
      this.listProduct();
  }

  listProduct = () =>{
    this.setState(state => {
        if(state.sort != ""){
          console.log("not ull sort..");
            state.products.sort((a,b) => (state.sort === "lowestprice") ? (a.price > b.price ? 1 : -1) : (a.price < b.price ? 1 : -1))
        }else{
            state.products.sort((a,b) => (a.id < b.id ? 1 : -1));
        }

        if(state.size !== ""){
          return{
            filterProducts : state.products.filter(a =>a.availableSizes.indexOf(state.size) >= 0)
          }
        }
        return {filterProducts : state.products}
    })
  }

  handleAddToCart = (e, product) => {
    console.log("calling handle cart...");
    const cartItems = this.state.cartItems;
    let productAlreadyInCart = false;
    cartItems.forEach(item => {
        if(item.id === product.id ){
            productAlreadyInCart = true;
            item.count ++;
        }
    });
    if(!productAlreadyInCart){
        cartItems.push({...product, count : 1});
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    this.setState({
      ...cartItems
    })
  }


  handleRemoveFromCart = (e, item) => {
    this.setState(state => {
        const cartItems = state.cartItems.filter(ele => ele.id != item.id)
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return {cartItems};
    })
  }
  
  render() {
    return (
      <div className="container">
        <h1>E-commerce Shopping Cart Application</h1>
        <hr />
        <div className="row">
          <div className="col-md-9">
            <Filter size = {this.state.size} 
              sort = {this.state.sort} 
              handleChangeSize = {this.handleChangeSize} 
              handleChangeSort = {this.handleChangeSort} 
              count = {this.state.filterProducts.length} />
            <hr />
            <Products products = {this.state.filterProducts} handleAddToCart = {this.handleAddToCart} />
          </div>
          <div className="col-md-3">
            <Basket cartItems = {this.state.cartItems} handleRemoveFromCart = {this.handleRemoveFromCart} />
            {/* <Copyright /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default App;