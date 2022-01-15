import React, { Component } from 'react';
import RobotPath from './ui/robotpath.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '',
      roomReady: false,
    };
  }

  handleClick() {
    this.setState({roomReady: true });
  }

render() {
    return (
      <div className="App">
        {this.state.roomReady ? 
        <RobotPath size={this.state.size}/> 
        : 
        <React.Fragment>
        <label>
          Room size:
          <input
              type="text"
              value={this.state.size}
              onChange={e => this.setState({ size: e.target.value })}
          />
      </label>
      <button onClick={() => this.handleClick()}>
        Generate room
      </button>
          </React.Fragment>}
      </div>
    );
  }
}

export default App;