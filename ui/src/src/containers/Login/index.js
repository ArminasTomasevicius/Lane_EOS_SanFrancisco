import React, { Component } from 'react';
import { connect } from 'react-redux';

import backgroundImage1 from '../../loginForm.jpg';
import {

  Button,

} from 'react-bootstrap';
import {Rectangle} from 'react-shapes';
import { Container, Row, Col} from 'reactstrap';

//let imgUrl = 'images/berlin.jpg'
// let stylesback = {
//     root: {
//         backgroundImage: 'url(' + backgroundImage1 + ')',
//         backgroundSize: 'cover',
//         overflow: 'hidden',
//     }
//   }

  
class Login extends Component {
    handleOnClick = () => {
        window.location=process.env.PUBLIC_URL + '/invoice';
       }
  render() {
    return (

      <Container>
      {/* <Row>
          
      <Image 
          style={background} responsive
          src={backgroundImage}
      />
          </Row> */}
      <Row >
          <Col>
              {/* <NavBar /> */}
          </Col>
      </Row>
      <br />
      <br />
      <Row>
          <Col xs="4"></Col>
          <Col xs="4">
              {/* <img
                  // src={icon}
                  alt='Decentralized Exchange Icon'
                  class='center'
                  style={{
                      maxWidth: '200px',
                      //justifyContent: 'center',
                      //alignItems: 'center',
                  }}
              /> */}
          </Col>
          <Col xs="4"></Col>
      </Row>
      <Row>
          <Col></Col>
          <Col>
          </Col>
          <Col></Col>
      </Row>
      <Row>
          <Col xs="1"></Col>
          <Col xs="1"></Col>
      </Row>
      <Row>
          <Col xs="3"></Col>
          <Col xs="auto">
              <div
                  style={{
                      
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      
                      background:"#FFFFFF",
                      marginTop: '23%',
                      marginBottom: '25%',
                      marginRight: '35%',
                      marginLeft: '35%'
                  }}
              >
              <br/>
                  <input style={this.inputStyle} type="text"placeholder="Username" />
                  <br/>
                  <br/>
                  <input style={this.inputStyle} type="password"placeholder="Password" />
                  <br/>
                  <br/>
                  <Button bsStyle="info" onClick={this.handleOnClick} >Login</Button>
              </div>
          </Col>
          <Col xs="3"></Col>
      </Row>
      <Row>
          <Col></Col>
          <Col>
          </Col>
          <Col></Col>
      </Row>
      <Row>
          <Col xs="1"></Col>
          <Col xs="1"></Col>
      </Row>
      <Row className="fillerRow">
          <Col></Col>
      </Row>
      <Row>
          <Col>
         
         
          </Col>
      </Row>
  </Container>        
);






    //   <div
    //     // style={{
    //     //   background: 'rgba(255, 255, 255, 0.85)',
    //     //   color: 'rgba(0, 0, 0, 0.65)',
    //     //   height: '100%',
    //     // }}
    //   >
    //     <br />
    //     <br />
    //     <div
    //       style={{
    //        // background: {backgroundImage}
    //         //margin: '0% 20%'
    //       }}
    //     >
    //       <br />
    //       <br />
    //       <div
    //         style={{
    //           margin: '0% 20%'
    //         }}
    //       >
    //         <br />
    //         <h1
    //           style={{
    //             color: 'rgba(0, 0, 0, 0.65)',
    //           }}
    //         >
    //        LANE
    //         </h1>
    //         <br />
    //         <input
    //           style={this.inputStyle}
    //           placeholder="Username"
             
    //         />
    //         <br />
    //         <br />
    //         <input
    //           style={this.inputStyle}
    //           placeholder="Password"
            
    //         />
    //         <br />
    //         <br />

    //         <Button bsStyle="info" onClick={this.handleOnClick} >Login</Button>
  

  

    //       <br />
    //       </div>
    //       <br />
    //       <br />
    //     </div>
    //     <br />
    //     <br />
    //   </div>
    // );
  }
}



export default (Login);