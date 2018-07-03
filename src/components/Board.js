import React, { Component } from 'react';
import '../App.css'

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      p_index: null,
      target_select: false
    };
  }
  
  move = e => {
    // Selects tile if image is clicked
    if (!e.target.classList.value) e.target = e.target.parentNode;
    // Use if/else to ensure that both piece index and target index are passed to movePice()
    if (this.state.target_select) {
      this.props.game.movePiece(this.state.p_index, e.target.id);
      this.setState({ p_index: null, target_select: false });
    } else if (e.target.children.length) {
      this.props.game.markValid(e.target.id);
      this.setState({ p_index: e.target.id, target_select: true });
    }
  }

  render() {
    return (
      <div className="board-container">
        {this.props.game.board.map(row => {
          return row.map(tile => {
            if (tile.piece) {
              return (
                <div className={`tile + ${tile.color} `} key={tile.index} id={tile.index} onClick={(e) => this.move(e)}>
                <img src={tile.piece.img} alt=""/>
                </div>
              );
            }
            return (
              <div className={`tile + ${tile.color} `} key={tile.index} id={tile.index} onClick={(e) => this.move(e)}>
              </div>
            );
          })
        })}
      </div>
    );
  }
}

export default Board;