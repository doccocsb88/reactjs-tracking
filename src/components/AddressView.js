
import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

class AddressView extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      list: [1, 2, 3],
    };
  }
  render() {
    return(
      <div>
  <Row>
      <Col>#</Col>
      <Col>Country</Col>
      <Col>Count</Col>

  </Row>


     {this.props.list.map((item,index) => (

    <Row key={index}>
      <Col>{index}</Col>
      <Col>{item.country}</Col>
      <Col>{item.count}</Col>
    </Row>
          ))}
</div>
    );
  }
}

export default AddressView;