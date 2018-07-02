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
      const row = [];
      // Loop through each item in row indexing from 'a' to 'h'
      for(let y = 'a'; y < 'i'; y = nextChar(y)) {
        // creates indexing from '8a' to '1h'
        const index = x + y; 
        let piece = null;
        // First and last rows for main peices
        if (x === 8 || x === 1) { 
          piece = new Piece(pieceColor, edgePieces[(y).charCodeAt() - 97]);
        } // Second and second to last rows for pawns
        if (x === 7 || x === 2) { 
          piece = new Piece(pieceColor, 'pawn');
        } // Swap peice color to white for opposing side
        if (x === 6) { 
          pieceColor = 1;
        }

        // if (piece) console.log(index, piece.name, piece.color);
        // else console.log(index, null);

        // Create tile with peice object and push to row
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

  getTilePiece(index) {
    for (let line of this.board) {
      for (let tile of line) {
        if (tile.index === index) {
          return tile.piece;
        }
      }
    }
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
        this.img = color ? 'black image file' : 'white image file';
        this.movement = 'y+1 || y+2';
        break;
      case 'rook':
        this.img = color ? 'black image file' : 'white image file';
        this.movement = 'x+1* || x-1* || y+1* || y-1*';
        break;
      case 'knight':
        this.img = color ? 'black image file' : 'white image file';
        this.movement = '(y+2 || y-2) && (x+3 || x-3)';
        break;
      case 'bishop':
        this.img = color ? 'black image file' : 'white image file';
        this.movement = '(x+1 && y+1)* || (x+1 && y-1)* || (x-1 && y+1)* || (x-1 && y-1)*';
        break;
      case 'queen':
        this.img = color ? 'black image file' : 'white image file';
        this.movement = 'x+1* || x-1* || y+1* || y-1* || (x+1 && y+1)* || (x+1 && y-1)* || (x-1 && y+1)* || (x-1 && y-1)*';
        break;
      case 'king':
        this.img = color ? 'black image file' : 'white image file';
        this.movement = 'x+1 || x-1 || y+1 || y-1 || (x+1 && y+1) || (x+1 && y-1) || (x-1 && y+1 || (x-1 && y-1)'
        break;
    }
  }
}

// // Create new game and populate board
// const game = new Game();
// game.setBoard();

// // Grab peice info by board position
// console.log(game.getTilePiece('8b'));
// console.log(game.getTilePiece('5e'));
// console.log(game.getTilePiece('2h'));

