import React, { Component } from 'react';



import {

  Button,

} from 'react-bootstrap';



  
class Login extends Component {
    handleOnClick = () => {
        window.location=process.env.PUBLIC_URL + '/invoice';
       }
  render() {
    return (
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          color: 'rgba(0, 0, 0, 0.65)',
          height: '100%',
        }}
      >
        <br />
        <br />
        <div
          style={{
            background: 'rgba(255, 255, 255, 1)',
            margin: '0% 20%'
          }}
        >
          <br />
          <br />
          <div
            style={{
              margin: '0% 20%'
            }}
          >
            <br />
            <h1
              style={{
                color: 'rgba(0, 0, 0, 0.65)',
              }}
            >
           LANE
            </h1>
            <br />
            <input
              style={this.inputStyle}
              placeholder="Username"
             
            />
            <br />
            <br />
            <input
              style={this.inputStyle}
              placeholder="Password"
            
            />
            <br />
            <br />

            <Button bsStyle="info" onClick={this.handleOnClick} >Login</Button>
  

  

          <br />
          </div>
          <br />
          <br />
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default (Login);
