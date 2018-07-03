import React, { Component } from 'react';
import './App.css';
import Board from './components/Board'
import Game from './Game';

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
        <Board game={this.state.game}/>
      </div>
    );
  }
}

export default App;
