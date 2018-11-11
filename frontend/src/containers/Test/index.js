import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TVChartContainer } from '../TVChartContainer/index';
import { pushTransfer } from '../../actions/api';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: null,
    };

  }

  render() {
    return (
      <div>
        <div>
          Test
          <div>
          <button
            onClick={() => {
              console.log('buy maker');
              this.props.pushTransfer(
                this.props.eos,
                'eosio.token',
                'eb1',
                '0.0005 EOS',
                'type:"buy", amount:"2.0000 AAA", price:"0.0002 EOS", ta:"tokenaaa", user_type:"maker"',
                'eb1@active',
                (r) => {console.log(r);},
              );
            }}
          >
            buy maker
          </button>
          <button
            onClick={() => {
              console.log('sell taker');
              this.props.pushTransfer(
                this.props.eos,
                'tokenaaa',
                'eb1',
                '0.5000 AAA',
                'type:"sell", amount:"0.5000 AAA", price:"0.0002 EOS", ta:"tokenaaa", user_type:"taker", k:' + this.state.input,
                'eb1@active',
                (r) => {console.log(r);},
              );
            }}
          >
            sell taker
          </button>
          <br />
          <br />
          <button
            onClick={() => {
              console.log('sell maker');
              this.props.pushTransfer(
                this.props.eos,
                'tokenaaa',
                'eb1',
                '3.0000 AAA',
                'type:"sell", amount:"3.0000 AAA", price:"0.0003 EOS", ta:"tokenaaa", user_type:"maker"',
                'eb1@active',
                (r) => {console.log(r);},
              );
            }}
          >
            sell maker
          </button>
          <button
            onClick={() => {
              console.log('buy taker');
              this.props.pushTransfer(
                this.props.eos,
                'eosio.token',
                'eb1',
                '0.0004 EOS',
                'type:"buy", amount:"1.0000 AAA", price:"0.0003 EOS", ta:"tokenaaa", user_type:"taker", k:' + this.state.input,
                'eb1@active',
                (r) => {console.log(r);},
              );
            }}
          >
            buy taker
          </button>
          <br />
          <br />
          <input
            onChange={(e) => {this.setState({input: e.target.value})}}
          >
          </input>
          <button
            onClick={() => {
              console.log('cancel');
              this.props.pushTransfer(
                this.props.eos,
                'eosio.token',
                'eb1',
                '0.0001 EOS',
                'type:"cancel", ta:"tokenaaa", symbol:"AAA", k:' + this.state.input,
                'eb1@active',
                (r) => {console.log(r);},
              );
            }}
          >
            cancel
          </button>
          </div>
        </div>
        {/*
        <TVChartContainer />
        */}
      </div>
    );
  }
}

export default connect(
  state => {
    return {
    };
  },
  {
    pushTransfer,
  }
)(Test);
