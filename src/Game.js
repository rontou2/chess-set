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

// Helper function for getting next letter in sequence
const nextChar = c => String.fromCharCode(c.charCodeAt() + 1);
const prevChar = c => String.fromCharCode(c.charCodeAt() - 1);

export default class Game {
  constructor () {
    this.board = [];
  }

  setBoard() {
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

        // Create tile with piece object and push to row
        row.push(new Tile(tileColor, piece, index));
        // Alternate tile colors
        tileColor = !tileColor;
      }
      // Swap peice color to white for opposing side
      if (x === 6) { 
        pieceColor = !pieceColor;
      }
      
      // Extra swap at end of row to make sure that tile colors are staggered
      tileColor = !tileColor;
      // Pushes row to board before continuing the loop
      this.board.push(row);
    }
  }

  setValid(idx, locArr) {
    const locIdxArr = [];

    locArr.forEach(loc => {
      let x_neg = false;
      let y_neg = false;
      let idxArr = idx.split('');

      if (loc[0] < 0) { x_neg = true; loc[0] = Math.abs(loc[0]) }
      if (loc[1] < 0) { y_neg = true; loc[1] = Math.abs(loc[1]) }
      
      for (let i = 0; i < loc[0]; i++) {
        if (x_neg) idxArr[0] = prevChar(idxArr[0]);
        else idxArr[0] = nextChar(idxArr[0]);
      }
      for (let i = 0; i < loc[1]; i++) {
        if (y_neg) idxArr[1] = String(Number(idxArr[1]) - 1);
        else idxArr[1] = String(Number(idxArr[1]) + 1);
      }

      locIdxArr.push(idxArr.join(''));
    });

    return locIdxArr;
  }

  markValid(p_index) {
    // find piece > check valid moves > set tiles to valid
    for (let line of this.board) {
      for (let tile of line) {
        if (tile.index === p_index) {
          const piece = tile.piece;
          
          switch (piece.name) {
            case 'pawn':
              if (piece.moves) {
                piece.movement = piece.color === 'black' ?
                this.setValid(p_index, [[0, -1]]) :
                this.setValid(p_index, [[0, 1]]);
              } else {
                piece.movement = piece.color === 'black' ?
                this.setValid(p_index, [[0, -1], [0, -2]]) :
                this.setValid(p_index, [[0, 1], [0, 2]]);
              }
              piece.moves++;
              break;
            case 'rook':
              piece.movement = this.setValid(p_index, [[0, 1], [0, 2], [0, 3],
              [0, 4], [0, 5], [0, 6], [0, 7], [0, -1], [0, -2], [0, -3],
              [0, -4], [0, -5], [0, -6], [0, -7], [1, 0], [2, 0], [3, 0],
              [4, 0], [5, 0], [6, 0], [7, 0], [-1, 0], [-2, 0], [-3, 0],
              [-4, 0], [-5, 0], [-6, 0], [-7, 0]]);
              break;
            case 'knight':
              piece.movement = piece.color === 'black' ?
              this.setValid(p_index, [[1, -2], [-1, -2], [-2, 1], [-2, -1]]) :
              this.setValid(p_index, [[1, 2], [-1, 2], [2, 1], [2, -1],
                [-2, 1], [-2, -1], [1, -2], [-1, -2]]);
              break;
            case 'bishop':
              piece.movement = this.setValid(p_index, [[1, 1], [2, 2], [3, 3],
                [4, 4], [5, 5], [6, 6], [7, 7], [-1, -1], [-2, -2], [-3, -3],
                [-4, -4], [-5, -5], [-6, -6], [-7, -7], [-1, 1], [-2, 2], [-3, 3],
                [-4, 4], [-5, 5], [-6, 6], [-7, 7], [1, -1], [2, -2], [3, -3],
                [4, -4], [5, -5], [6, -6], [7, -7]])
              break;
            case 'queen':
              piece.movement = this.setValid(p_index, [[0, 1], [1, 1], [1, 0],
                [0, -1], [-1, -1], [-1, 0], [1, -1], [-1, 1], [0, 2], [2, 2],
                [2, 0], [0, -2], [-2, -2], [-2, 0], [2, -2], [-2, 2], [0, 3],
                [3, 3], [3, 0], [0, -3], [-3, -3], [-3, 0], [3, -3], [-3, 3],
                [0, 4], [4, 4], [4, 0], [0, -4], [-4, -4], [-4, 0], [4, -4],
                [-4, 4], [0, 5], [5, 5], [5, 0], [0, -5], [-5, -5], [-5, 0],
                [5, -5], [-5, 5], [0, 6], [6, 6], [6, 0], [0, -6], [-6, -6], 
                [-6, 0]], [6, -6], [-6, 6], [0, 7], [7, 7], [7, 0],
                [0, -7], [-7, -7], [-7, 0], [7, -7], [-7, 7]);
              break;
            case 'king':
              piece.movement = this.setValid(p_index, [[0, 1], [1, 1], [1, 0],
                [0, -1], [-1, -1], [-1, 0], [1, -1], [-1, 1]]);
              break;
            default:
              break;
          }

          for (let line of this.board) {
            for (let tile of line) {
              if (piece.movement.includes(tile.index)) {
                tile.valid = true;
              }
            }
          }
        }
      }
    }
  }

  // Moved peice from piece index to target index
  movePiece(p_index, t_index) {
    // Pull variables out of loop to expand scope
    let piece = null;
    let o_tile = null;
    let t_tile = null;

    // Look for old and new tiles by index
    for (let line of this.board) {
      for (let tile of line) {
        if (tile.index === p_index) {
          // Grap piece and old tile
          piece = tile.piece;
          o_tile = tile;
        }
        if (tile.index === t_index) {
          // Grab target tile
          t_tile = tile;
        }
      }
    }

    // Only move piece if old tile has one to move and move id valid
    // // Make sure you can't take out your own pieces
    if (t_tile.piece) {
      if (o_tile.piece.color !== t_tile.piece.color) {
        o_tile.piece = null;
        t_tile.piece = piece;
      }
    } else {
      if (o_tile.piece && t_tile.valid) {
        o_tile.piece = null;
        t_tile.piece = piece;
      }
    }

    // Reset all valid tags
    for (let line of this.board) {
      for (let tile of line) {
        tile.valid = false;
      }
    }
  }
}

class Tile {
  constructor (color, piece, index) {
    this.color = color ? 'black' : 'white';
    this.piece = piece;
    this.index = index;
    this.valid = false;
  }
}

class Piece {
  constructor (color, name) {
    this.color = color ? 'black' : 'white';
    this.name = name;
    this.movement = [];
    
    // Images and movement are detrmined by nameand color of piece
    switch (name) {
      case 'pawn':
        this.img = color ? pawn_b : pawn_w;
        this.moves = 0;
        // this.movement = 'y+1 || y+2';
        break;
      case 'rook':
        this.img = color ? rook_b : rook_w;
        // this.movement = 'x+1* || x-1* || y+1* || y-1*';
        break;
      case 'knight':
        this.img = color ? knight_b : knight_w;
        // this.movement = '(y+2 || y-2) && (x+3 || x-3)';
        break;
      case 'bishop':
        this.img = color ? bishop_b : bishop_w;
        // this.movement = '(x+1 && y+1)* || (x+1 && y-1)* || (x-1 && y+1)* || (x-1 && y-1)*';
        break;
      case 'queen':
        this.img = color ? queen_b : queen_w;
        // this.movement = 'x+1* || x-1* || y+1* || y-1* || (x+1 && y+1)* || (x+1 && y-1)* || (x-1 && y+1)* || (x-1 && y-1)*';
        break;
      case 'king':
        this.img = color ? king_b : king_w;
        // this.movement = 'x+1 || x-1 || y+1 || y-1 || (x+1 && y+1) || (x+1 && y-1) || (x-1 && y+1 || (x-1 && y-1)'
        break;
      default:
        break;
    }
  }
}
