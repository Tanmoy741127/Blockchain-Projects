import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add product</h1>
        <form onSubmit={(event)=>{
          event.preventDefault();
          this.props.createProduct(this.productName.value,window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether'));
        }}>
          <input type="text" id='productName' placeholder='Product name' ref={(input)=>{this.productName=input}} required /><br/>
          <input type="text" id="productPrice" placeholder='Price' ref={(input)=>{this.productPrice=input}} required />
          <button type='submit'>Submit</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Owner</th>
              <th>Purchased</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product, index) => {
              return(
                <tr key={index}>
                  <th>{product.id.toString()}</th>
                  <th>{product.name.toString()}</th>
                  <th>{product.price.toString()}</th>
                  <th>{product.owner.toString()}</th>
                  <th>{product.purchased ? "Yes" : "No"}</th>
                  <th><button 
                  name={product.id}
                  value={product.price}
                  onClick={(event)=>{    
                       this.props.purchaseProduct(event.target.name, event.target.value) 
                    }}>Buy now</button></th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
