import React, { Component } from 'react'

export default class Filter extends Component {
  render() {
      console.log("props of filter..", this.props);
    return (
        <div className="row">
            <div className="col-md-4">
                {`${this.props.count} 
            products found.`}</div>
            <div className="col-md-4">
            <label>
                Order by
                <select
                className="form-control"
                value={this.props.sort}
                onChange = {this.props.handleChangeSort}
                // onChange={(event) => {
                //     this.props.sortProducts(
                //     this.props.filteredProducts,
                //     event.target.value
                //     );
                // }}
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
                onChange = {this.props.handleChangeSize}
                // onChange={(event) => {
                //     this.props.filterProducts(
                //     this.props.products,
                //     event.target.value
                //     );
                // }}
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
