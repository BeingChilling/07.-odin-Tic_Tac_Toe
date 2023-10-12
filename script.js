"use strict";

// / Add grid cell into board directly?
let boardArray = [];
const initializeBoard = (function () {
  let boardHTML = document.querySelector(".board");
  for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");
    const arrayRow = [];
    row.classList.add("row");
    boardHTML.appendChild(row);
    boardArray.push(arrayRow);
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("td");
      const arrayCell = 0;
      cell.classList.add("cell");
      cell.setAttribute("id", `cell-${i}-${j}`);
      row.appendChild(cell);
      arrayRow.push(arrayCell);
    }
  }
})();

const player1 = {
  name: "player1",
  piece: "X",
};

const player2 = {
  name: "player2",
  piece: "O",
};

let activePlayer = player1;
const makeMove = function (cell) {
  const cellId = cell.getAttribute("id");
  const [i, j] = cellId.split("-").slice(1).map(Number);

  if (cell.innerHTML === "") {
    cell.innerHTML = activePlayer.piece;
    boardArray[i][j] = activePlayer.piece;
    activePlayer = activePlayer === player1 ? player2 : player1;
  }
};

// ? Below to be changed.

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", function () {
    makeMove(cell);
    checkWinner();
  });
});

// / Check winning condition

const checkWinner = function () {
  const checkLine = function (a, b, c) {
    return a !== 0 && a === b && b === c;
  };

  let draw = true;

  for (let i = 0; i < 3; i++) {
    // Check row
    if (checkLine(boardArray[i][0], boardArray[i][1], boardArray[i][2])) {
      return boardArray[i][0] === "X"
        ? alert(`player1 won!`)
        : alert(`player2 won!`);
    }

    // Check column
    if (checkLine(boardArray[0][i], boardArray[1][i], boardArray[2][i])) {
      return boardArray[0][i] === "X"
        ? alert(`player1 won!`)
        : alert(`player2 won!`);
    }

    for (let j = 0; j < 3; j++) {
      if (boardArray[i][j] === 0) {
        draw = false;
      }
    }
  }

  // Check diagonal
  if (checkLine(boardArray[0][0], boardArray[1][1], boardArray[2][2])) {
    return boardArray[0][0] === "X"
      ? alert(`player1 won!`)
      : alert(`player2 won!`);
  }
  if (checkLine(boardArray[2][0], boardArray[1][1], boardArray[0][2])) {
    return boardArray[2][0] === "X"
      ? alert(`player1 won!`)
      : alert(`player2 won!`);
  }

  // If no winner is found, check for a draw
  if (draw) {
    return alert(`Draw!`);
  }

  return null;
};
