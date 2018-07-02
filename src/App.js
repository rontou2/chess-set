import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      game: new Game(),
    };

    this.state.game.setBoard();
  }
  
  render() {
    return (
      <div className="App">

          To get started, edit <code>src/App.js</code> and save to reload.

      </div>
    );
  }
}

export default App;
