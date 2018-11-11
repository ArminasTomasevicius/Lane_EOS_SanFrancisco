import React, { Component } from 'react';
import {Modal,Panel, ListGroup, ListGroupItem,Button, Alert} from 'react-bootstrap'

//call for the push transaction


//***Hardcode for now */
const contract="abc";
const transferTokenAccount="tokenName";
const from="useracctname" ;
const quantity="20AABB"; 
const memo="optional" ;
const auth={actor: 'acctname1234', permission: 'active'};

let inputStyle1 = {
  float:'right',
  margin: '0px 5px 0px 10px'

};
let inputStyle2 = {
  float:'right',
    padding: "3px",
    border: '1px solid black',
    display: 'inline-block',


};

class Invoice extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.pushTransfer = this.pushTransfer.bind(this);

    //for the pop ups
    
    // this.handleShowContractSucesss = this.handleShowContractSucesss.bind(this);
    // this.handleShowContractFailure = this.handleShowContractFailure.bind(this);

    this.state = {
      showModel: false,
      showAlertSucess:false,
      showAlertFailure:false,
    };
  }

   pushTransfer(eos, contract,transferTokenAccount, from, quantity, memo, auth, callback = () => {}) {
    return (dispatch) => eos.transaction({
      actions: [
        {
          account: transferTokenAccount,
          name: 'abcfgfgf',
          authorization: [auth],
          data: {
            from: from,
            to: contract,
            quantity: quantity,
            memo: memo,
          }
        },
      ],
    }).then(r => {
      dispatch({ type: 'TRANSFER_SUCCEEDED', r });
      callback(r);
    }).catch(e => {
      dispatch({ type: 'TRANSFER_FAILED', e });
      callback(e);
    });}



  handleShow() {
    this.setState({ showModel: true });
  }

  handleHide() {
    this.setState({ showModel: false });
  }
  acceptContract(){
    let result=  this.props.pushTransfer(this.props.eos,contract,transferTokenAccount, from, quantity, memo, auth)
    if(result.type==='SUCCEEDED')
            {
              this.setState({ showAlertSucess: true });
            }
            else{
              this.setState({ showAlertFailure: true });
            }
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
            margin:  '0% 20%'
          }}
        >
          <br />
          <br />
          <div
            style={{
              margin:  '0% 20%'
            }}
          >
            <br />
            <h1
              style={{
                color: 'rgba(0, 0, 0, 0.65)',
              }}
            >
              Invoice
            </h1>
  <div>
  <Panel>
    <Panel.Heading componentClass="h3">Verified</Panel.Heading>
    <Panel.Body>
  <ListGroup>
  <ListGroupItem>Item 1  
     <Button bsStyle="success" bsSize="small" style={inputStyle1}  onClick={this.handleShow}>Accept</Button>
     <span style={inputStyle2}>900</span>
  </ListGroupItem>
  <ListGroupItem>Item 2  
     <Button bsStyle="success" bsSize="small" style={inputStyle1} onClick={this.handleShow}>Accept</Button>
     <span style={inputStyle2}>900</span>
  </ListGroupItem>
  <ListGroupItem>Item 3  
     <Button bsStyle="success" bsSize="small" style={inputStyle1}  onClick={this.handleShow}  >Accept</Button>
     <span style={inputStyle2}>900</span>
  </ListGroupItem>
</ListGroup>
</Panel.Body>
    
  </Panel>
  <Panel>
    <Panel.Heading componentClass="h3">Unverified
    </Panel.Heading>
    <Panel.Body>  <ListGroup>
  <ListGroupItem>Item 1  
     <Button bsStyle="success" bsSize="small" style={inputStyle1}  onClick={this.handleShow}>Accept</Button>
     <span style={inputStyle2}>900</span>
  </ListGroupItem>
  <ListGroupItem>Item 2  
     <Button bsStyle="success" bsSize="small" style={inputStyle1}  onClick={this.handleShow}>Accept</Button>
     <span style={inputStyle2}>900</span>
  </ListGroupItem>
  <ListGroupItem>Item 3  
     <Button bsStyle="success" bsSize="small" style={inputStyle1}  onClick={this.handleShow}>Accept</Button>
     <span style={inputStyle2}>900</span>
  </ListGroupItem>
</ListGroup>
</Panel.Body>
  </Panel>

          <Modal
          {...this.props}
          show={this.state.showModel}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Proceed towards transaction</h4>
            <p>
                Your transaction is insured in case of default
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleHide}>Accept</Button>
            <Button bsStyle="danger" onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
        {/* if( !showAlertSucess:false)
        {

        }
      showAlertFailure:false,) */}
          {/* <Alert bsStyle="danger"      
               {...this.props}
          show={this.state.showAlertFailure}
          >
          <h4>Error</h4>
          <p>
              Error occcurred during connection
          </p>

        </Alert> */}





</div>


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


export default (Invoice);


