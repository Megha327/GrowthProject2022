import React, { Component } from 'react';
import {connect}  from "react-redux";
import { fetchProducts, addToCart } from "../actions/ProductActions";
import util from "../Util";

class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() { 
    const productItems = this.props.products.map((product) => (
        <div className="col-md-4" key={product.id}>
          <div className="thumbnail text-center">
            <a
              href={`#${product.id}`}
              onClick={(e) => this.props.addToCart(this.props.cartItems, product)}
            >
              <img src={`products/${product.sku}_2.jpg`} alt={product.title} />
              <p>{product.title}</p>
            </a>
            <b>{util.formatCurrency(product.price)}</b> &nbsp;
            <button
              className="btn btn-primary"
              onClick = {() => this.props.addToCart(this.props.cartItems, product)}
            >
              Add to cart
            </button>
          </div>
        </div>
      ));
    return (
        <div className="row">{productItems}</div>
    )
  }
}

// export default Products;

const mapStateToProps = (state) => ({
  products: state.products.filteredItems,
  cartItems: state.cart.items,

})

export default connect(mapStateToProps, {fetchProducts, addToCart})(Products);
