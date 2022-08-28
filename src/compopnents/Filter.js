import React, { Component } from 'react';
import {connect}  from "react-redux";
import {filterProducts, sortProducts} from "../actions/ProductActions";

class Filter extends Component {
  render() {
      console.log("--->>>> ", this.props.filterProducts);
    return (
        <div className="row">
            <div className="col-md-4">
                {`${this.props.filteredProducts.length} 
            products found.`}</div>
            <div className="col-md-4">
            <label>
                Order by
                <select
                className="form-control"
                value={this.props.sort}
                onChange={(event) => {
                    this.props.sortProducts(
                    this.props.filteredProducts,
                    event.target.value
                    );
                }}
                >
                <option value="">Select</option>
                <option value="lowestprice">Lowest to highest</option>
                <option value="highestprice">Highest to lowest</option>
                </select>
            </label>
            </div>
            <div className="col-md-4">
            <label>
                {" "}
                Filter Size
                <select
                className="form-control"
                value={this.props.size}
                onChange={(event) => {
                    this.props.filterProducts(
                    this.props.products,
                    event.target.value
                    );
                }}
                >
                <option value="">ALL</option>
                <option value="X">XS</option>
                <option value="X">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                </select>
            </label>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
    size: state.products.size,
    sort: state.products.sort,
})
  
export default connect(mapStateToProps, {filterProducts, sortProducts})(Filter);