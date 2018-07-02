import bishop_b from './images/bishop_b.png'
import bishop_w from './images/bishop_w.png'
import king_b from './images/king_b.png'
import king_w from './images/king_w.png'
import knight_b from './images/knight_b.png'
import knight_w from './images/knight_w.png'
import pawn_b from './images/pawn_b.png'
import pawn_w from './images/pawn_w.png'
import queen_b from './images/queen_b.png'
import queen_w from './images/queen_w.png'
import rook_b from './images/rook_b.png'
import rook_w from './images/rook_w.png'

export default class Game {
  constructor () {
    this.board = [];
  }

  setBoard() {
    // Helper function for getting next letter in sequence
    const nextChar = c => String.fromCharCode(c.charCodeAt(0) + 1);

    // Helper array for order of main peices
    const edgePieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

    // Starting colors of tiles and pieces
    let tileColor = false; // white
    let pieceColor = true; // black

    // Loop through each row indexing from 8 to 1
    for(let x = 8; x > 0; x--) {
      const row = []; // Row base to be added to
      // Loop through each item in row indexing from 'a' to 'h'
      for(let y = 'a'; y < 'i'; y = nextChar(y)) {
        // creates indexing from '8a' to '1h'
        const index = y + x; 
        let piece = null;

        // First and last rows for main peices
        if (x === 8 || x === 1) { 
          piece = new Piece(pieceColor, edgePieces[(y).charCodeAt() - 97], index);
        }
        // Second and second-to-last rows for pawns
        if (x === 7 || x === 2) { 
          piece = new Piece(pieceColor, 'pawn');
        }
        // Swap peice color to white for opposing side
        if (x === 6) { 
          pieceColor = 1;
        }

        // Create tile with piece object and push to row
        row.push(new Tile(tileColor, piece, index));
        // Alternate tile colors
        tileColor = !tileColor;
      }

      // Extra swap at end of row to make sure that tile colors are staggered
      tileColor = !tileColor;
      // Pushes row to board before continuing the loop
      this.board.push(row);
    }
  }

  // Returns piece data from tile index
  getPieceAt(index) {
    for (let line of this.board) {
      for (let tile of line) {
        if (tile.index === index) return tile.piece;
      }
    }
  }

  // Removes piece data from tile index
  removePieceAt(index) {
    for (let line of this.board) {
      for (let tile of line) {
        if (tile.index === index) tile.piece = null;
      }
    }
  }

  // Moved peice from peice index to target index
  movePiece(p_index, t_index) {
    // Pull variables out of loop to expand scope
    let piece = null;
    let o_tile = null;
    let placed = false;

    // Look for old and new tiles by index
    for (let line of this.board) {
      for (let tile of line) {
        if (tile.index === p_index) {
          // Grap peice and set tile to null
          piece = tile.piece;
          tile.piece = null;
          o_tile = tile;
        }
        if (tile.index === t_index && tile.piece === null) {
          // Place tile and set flag
          tile.piece = piece;
          placed = true;
        }
      }
    }

    // If not able to place piece then reset
    if (!placed) o_tile.piece = piece;
  }
}

class Tile {
  constructor (color, piece, index) {
    this.color = color ? 'black' : 'white';
    this.piece = piece;
    this.index = index;
  }
}

class Piece {
  constructor (color, name) {
    this.color = color ? 'black' : 'white';
    this.name = name;
    
    // Images and movement are detrmined by nameand color of piece
    switch (name) {
      case 'pawn':
        this.img = color ? {pawn_b} : {pawn_w};
        this.movement = 'y+1 || y+2';
        break;
      case 'rook':
        this.img = color ? {rook_b} : {rook_w};
        this.movement = 'x+1* || x-1* || y+1* || y-1*';
        break;
      case 'knight':
        this.img = color ? {knight_b} : {knight_w};
        this.movement = '(y+2 || y-2) && (x+3 || x-3)';
        break;
      case 'bishop':
        this.img = color ? {bishop_b} : {bishop_w};
        this.movement = '(x+1 && y+1)* || (x+1 && y-1)* || (x-1 && y+1)* || (x-1 && y-1)*';
        break;
      case 'queen':
        this.img = color ? {queen_b} : {queen_w};
        this.movement = 'x+1* || x-1* || y+1* || y-1* || (x+1 && y+1)* || (x+1 && y-1)* || (x-1 && y+1)* || (x-1 && y-1)*';
        break;
      case 'king':
        this.img = color ? {king_b} : {king_w};
        this.movement = 'x+1 || x-1 || y+1 || y-1 || (x+1 && y+1) || (x+1 && y-1) || (x-1 && y+1 || (x-1 && y-1)'
        break;
      default:
        break;
    }
  }
}

