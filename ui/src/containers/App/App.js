// import React, { Component } from 'react';
// import logo from './../../logo.svg';
// import './../../App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
//import { connect } from 'react-redux';

import Eos from 'eosjs';
import ReactGA from 'react-ga';

import Login from '../Login';
import Invoice from '../Invoice';


ReactGA.initialize('UA-108802756-8', {
  debug: true,
});




//Local testnet
const network = {
    protocol: 'http', // Defaults to https
    blockchain: 'eos',
    host: '192.168.99.100', // ( or null if endorsed chainId )
    port: 8888, // ( or null if defaulting to 80 )
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
}


const defaultEos = Eos({
  httpEndpoint: network.protocol + '://' + network.host + ':' + network.port,
  chainId: network.chainId,
  verbose: true,
});


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eos: defaultEos,
   
    };

  }

  render() {
    return (
      <Router>
        <div>

          <Switch>
            <Redirect exact from={process.env.PUBLIC_URL + '/'} to={process.env.PUBLIC_URL + '/login1'}/>
            <Redirect exact from={process.env.PUBLIC_URL + '/login'} to={process.env.PUBLIC_URL + '/login1'}/>


            {/* <Route path={process.env.PUBLIC_URL + '/about'} render={(props) => { return (
              <About
              />
            )}} /> */}
            <Route path={process.env.PUBLIC_URL + '/login1'} render={(props) => { return (
              <Login
              />
            )}} />
           <Route path={process.env.PUBLIC_URL + '/invoice'} render={(props) => { return (
              <Invoice
              />
            )}} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default (App);

