import React, { Component } from 'react';
import '../App.css'

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      p_index: null,
      piece_selected: false,
    };
  }
  
  move = e => {
    // Selects tile if image is clicked
    if (!e.target.classList.value) e.target = e.target.parentNode;
    // Use if/else to ensure that both piece index and target index are passed to movePice()
    if (this.state.piece_selected) {
      this.props.game.movePiece(this.state.p_index, e.target.id);
      this.setState({ p_index: null, piece_selected: false });
    } else if (e.target.children.length) {
      this.props.game.markValid(e.target.id);
      this.setState({ p_index: e.target.id, piece_selected: true });
    }
  }

  render() {
    return (
      <div>
      <div className="board-container">
        {this.props.game.board.map(row => {
          return row.map(tile => {
            if (tile.piece) {
              return (
                <div className={`tile ${tile.color} `} key={tile.index} id={tile.index} onClick={(e) => this.move(e)}>
                <img src={tile.piece.img} alt=""/>
                </div>
              );
            }
            return (
              <div className={`tile ${tile.color} `} key={tile.index} id={tile.index} onClick={(e) => this.move(e)}>
              </div>
            );
          })
        })}
      </div>
      <div className="footer">
        <h4>Turn: {this.props.game.turn}</h4>
        <h4>Piece Selected: {String(this.state.piece_selected)}</h4>
      </div>
      </div>
    );
  }
}

export default Board;