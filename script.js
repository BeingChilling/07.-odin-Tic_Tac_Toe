"use strict";

let board = [];

for (let i = 0; i < 3; i++) {
  let row = [];
  board.push(row);
  for (let j = 0; j < 3; j++) {
    let cell = 0;
    row.push(cell);
  }
}

const player1 = {
  name: "player1",
  piece: "X",
};

const player2 = {
  name: "player2",
  piece: "O",
};

let activePlayer = player1;

const makeMove = function (x, y) {
  if (board[x][y] === 0) {
    if (x >= 0 && x < 3 && y >= 0 && y < 3) {
      board[x][y] = activePlayer.piece;
      activePlayer = activePlayer === player1 ? player2 : player1;
      return board;
    }
  } else {
    return "Invalid move. Cell already taken. Try again.";
  }
};

// / Check winning condition
const checkLine = function (a, b, c) {
  return a !== 0 && a === b && b === c;
};

const checkWinner = function () {
  for (let i = 0; i < 3; i++) {
    // * Check row
    if (checkLine(board[i][0], board[i][1], board[i][2])) {
      return board[i][0] === "X" ? `player1 won!` : `player2 won!`;
    }
    // * Check column
    if (checkLine(board[0][i], board[1][i], board[2][i])) {
      return board[i][0] === "X" ? `player1 won!` : `player2 won!`;
    }
  }
  // * Check diagnol
  if (checkLine(board[0][0], board[1][1], board[2][2])) {
    return board[0][0] === "X" ? `player1 won!` : `player2 won!`;
  }
  if (checkLine(board[2][0], board[1][1], board[0][2])) {
    return board[2][0] === "X" ? `player1 won!` : `player2 won!`;
  }

  let draw = true;
  // * If there's still space on the board, not a draw
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 0) {
        draw = false;
        break;
      }
    }
    if (draw) {
      break; // Exit the outer loop if an empty cell is found
    }
  }
  if (draw) {
    return `Draw!`;
  }

  return null;
};

// * check draw
