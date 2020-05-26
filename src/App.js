import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import AddressView from './components/AddressView';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  static defaultProps = {
    menu: ['event','address']
  }

  constructor(props){
    super(props);
    this.state = {
      datas: [],
      viewType: 'event'
    }
    
    this.clickHandler = this.clickHandler.bind(this)

  }

  getListEvents() {
    axios.get('http://localhost:3000/events')
            .then(response => {
                console.log(response.data);
                this.setState({datas: response.data});
            })
            .catch(function (error) {
                console.log(error);
    })
  }

  getListAddress(eventName) {
    var apiURL = 'http://localhost:3000/address/' + eventName;
    console.log('getListAddress ' + apiURL);

    axios.get(apiURL)
            .then(response => {
                console.log(response.data.data);
                this.setState({datas: response.data.data, viewType: 'address'});
            })
            .catch(function (error) {
                console.log(error);
    })
  }

  fetchEventData(menu) {
    if (menu == this.props.menu[0]) {
      this.getListEvents()
    } else if (menu == this.props.menu[1]) {
      this.getListAddress()
    }
  }

  clickHandler(eventName) {
      console.log(eventName);
      this.getListAddress(eventName);
  }

  componentDidMount(){
    //this.getListEvents()
  }

  render() {
        let contentView;

      if (this.state.viewType == 'event') {
        contentView = <EventComponent list={this.state.datas} clickHandler={this.clickHandler}/>
      } else if (this.state.viewType == 'address') {
        contentView = <AddressView list={this.state.datas}/>

      }
      

    return(
      <div className="App">
      {this.state.data}
      <div className="side-menu">
            <ul>
                <li  onClick={() => this.fetchEventData(this.props.menu[0])}>Event</li>
                <li  onClick={() => this.fetchEventData(this.props.menu[1])}>Country</li>

            </ul>
        </div> 
      <div className="content">
      {contentView}
      </div>
      <div className="clear"/>
    </div>
    );
  }
}

export default App;

class EventComponent extends Component {
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
      <Col>Event name</Col>
      <Col>Count</Col>

  </Row>


     {this.props.list.map((item,index) => (

    <Row key={index} onClick={() => this.props.clickHandler(item.eventName)}>
      <Col>{index}</Col>
      <Col>{item.eventName}</Col>
      <Col>{item.count}</Col>
    </Row>
          ))}
</div>
    );
  }
}
