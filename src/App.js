import React, { Component, PureComponent } from 'react';
import './App.css';
import update from 'immutability-helper';

class Line extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stateNumber: 0
    };

    this.clickStateNumber = this.clickStateNumber.bind(this);
  }

  componentDidUpdate() {
    console.log("Line did update");
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    console.log("nextProps", nextProps, "nextState", nextState);
    return (
      this.state.stateNumber !== nextState.stateNumber ||
      this.props.product !== nextProps.product ||
      this.props.clickPropNumber !== nextProps.clickPropNumber
    );
  }*/
  
  clickStateNumber() {
    console.log("clickStateNumber");
    this.setState(state => ({stateNumber: state.stateNumber + 1}));
  }

  render() {
    return (
      <tr>
        <td><button onClick={() => this.props.clickPropNumber(this.props.product.id)}>{this.props.product.propNumber}</button></td>
        <td><button onClick={this.clickStateNumber}>{this.state.stateNumber}</button></td>
      </tr>
    );
  }
}

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stateNumber: 0
    };

    this.clickPropNumber = this.clickPropNumber.bind(this);
    
    this.state = {
      products: [
        {id: 0, propNumber: 0},
        {id: 1, propNumber: 0},
        {id: 2, propNumber: 0},
        {id: 3, propNumber: 0},
      ]
    };
  }

  componentDidUpdate() {
    console.log("App");
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    return this.state.products.length !== nextState.products.length;
  }*/
  
  clickPropNumber(id) {
    console.log("clickPropNumber");
    
    {
      var i = this.state.products.findIndex(function(c) { 
          return c.id === id; 
      });
      
      //getting custom attribute value.
      let obj = Object.assign({}, this.state.products[i],{propNumber: this.state.products[i].propNumber + 1});

      //update state value.
      this.setState({products: [...this.state.products.slice(0, i),   obj, ...this.state.products.slice(i + 1)]});
    }

    // with immutability-helper
    //this.setState({products: update(this.state.products, {$push: [{id: 4, propNumber: 0}]})});    
  }
  
  render() {
    const listItems = this.state.products.map((product) =>
      <Line key={product.id} product={product} clickPropNumber={this.clickPropNumber} />
    );
                                 
    return (
      <table>
        <thead>
        <tr>
          <th>propNumber</th>
          <th>stateNumber</th>
        </tr>
        </thead>
        <tbody>
        {listItems}
        </tbody>
      </table>
    );
  }
}

export default App;
