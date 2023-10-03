// ^ 1. When I click on the cell, I will get either an "o" or an "x".

// const cells = document.querySelectorAll(".cell");
// let currentPlayer = "x"; // Variable to keep track of the current player

// cells.forEach((cell) => {
//   cell.addEventListener("click", function () {
//     const piece = cell.innerHTML;
//     if (piece === "") {
//       cell.innerHTML = currentPlayer; // Set the content of the clicked cell to the current player's symbol
//       currentPlayer = currentPlayer === "x" ? "o" : "x"; // Toggle between "x" and "o"
//     }
//   });
// });

// ? Try to break down the logic? If I do it on the console?
// ^ 1. Make the board? 3*3
// ^ 2. Toggle player
// ^ 3. Different piece for defferent player.

// ~ A board. Input a function with a parameter. put(3/a, a/3) will set the piece. Then switch to player2.
let board;
const checkerBoard = function () {
  const row = 3;
  const column = 3;
  board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i][j] = 0;
    }
  }
  return board;
};
checkerBoard();

// * player1 put down a piece
// *toggle triggered
// *switch to player 2
// *player2 put down a piece
// player2 called putDownPiece()
// *toggle triggered
// *switch to player 1
// player1 called putDownPiece()

const player = [
  { name: "playerOne", piece: 1 },
  { name: "playerTwo", piece: 2 },
];
let activePlayer = player[0];

// ~ Put down piece
const putDownPiece = function (x, y) {
  // * if I put in (0, 0), the piece would be at the most far low left.
  // means row 2, column 0 is (0,0)
  // * if I put in (3, 3), the piece would be at the most far top right.
  // means row 0, column 2 is (3,3)
  // ? So how to make this transition?
  // * First hard code, then study.

  // ^ This one is even better.
  // Check if the position is within the board's bounds
  if (x >= 0 && x < 3 && y >= 0 && y < 3) {
    // Check if the position is empty before placing the piece
    if (board[x][y] === 0) {
      board[x][y] = activePlayer.piece;
      // Switch players
      activePlayer = activePlayer === player[0] ? player[1] : player[0];
      console.log(`currently is ${activePlayer.name}'s turn`);
    } else {
      console.log("This position is already occupied. Try another position.");
    }
  } else {
    console.log(
      "Invalid position. Please enter valid coordinates within the board."
    );
  }
};

// ~ Player1 do things. Toggle player. Player2 do things.
const togglePlayers = function () {};

// / ----------------------------------------------------------------------------------
// ~ ------------------------------------ HOW TO MAKE A CONSOLE CONNECT FOUR----------------------------------------------
// / ----------------------------------------------------------------------------------

/*
 ** The Gameboard represents the state of the board
 ** Each equare holds a Cell (defined later)
 ** and we expose a dropToken method to be able to add Cells to squares
 */

// function Gameboard() {
//   const rows = 6;
//   const columns = 7;
//   const board = [];

//   // Create a 2d array that will represent the state of the game board
//   // For this 2d array, row 0 will represent the top row and
//   // column 0 will represent the left-most column.
//   // This nested-loop technique is a simple and common way to create a 2d array.
//   for (let i = 0; i < rows; i++) {
//     board[i] = [];
//     for (let j = 0; j < columns; j++) {
//       board[i].push(Cell());
//       // ^ I understand here.
//     }
//   }

//   // This will be the method of getting the entire board that our UI will eventually need to render it.
//   const getBoard = () => board; // ^ This might be a convention. You organize things into functions.

//   // In order to drop a token, we need to find what the lowest point of the selected column is, *then* change that cell's value to the player number
//   const dropToken = (column, player) => {
//     // ^ 1. input a number as the column
//     // Our board's outermost array represents the row, so we need to loop through the rows, starting at row 0, find all the rows that don't have a token, then take the last one, which will represent the bottom-most empty cell
//     const availableCells = board
//       .filter((row) => row[column].getValue() === 0) // ^ 2. Now the filter will check each 3 of the row.
//       .map((row) => row[column]); // ^ 3. And it will know how many columns there is and gather them into an array.

//     // If no cells make it through the filter, the move is invalid. Stop execution.
//     // * The array length of row.
//     if (!availableCells.length) return;

//     // Otherwise, I have a valid cell, the last one in the filtered array
//     const lowestRow = availableCells.length - 1;
//     board[lowestRow][column].addToken(player); // ^ 3. This will be the length of the availableCell. Fucking beautiful.
//   };

//   // This method will be used to print our board to the console. It is helpful to see what the board looks like after each turn as we play, but we won't need it after we build our UI
//   const printBoard = () => {
//     const boardWithCellValues = board.map((row) =>
//       row.map((cell) => cell.getValue())
//     );
//     console.log(boardWithCellValues);
//   };

//   // Here, we provide an interface for the rest of our
//   // application to interact with the board
//   return { getBoard, dropToken, printBoard };
// }

// /*
//  ** A Cell represents one "square" on the board and can have one of
//  ** 0: no token is in the square,
//  ** 1: Player One's token,
//  ** 2: Player two's token
//  */

// function Cell() {
//   let value = 0;

//   // Accept a player's token to change the value of the cell
//   const addToken = (player) => {
//     value = player;
//   };

//   // How we will retrieve the current value of this cell through closure
//   const getValue = () => value;

//   return {
//     addToken,
//     getValue,
//   };
// }

// /*
//  ** The GameController will be responsible for controlling the
//  ** flow and state of the game's turns, as well as whether
//  ** anybody has won the game
//  */
// function GameController(
//   playerOneName = "Player One",
//   playerTwoName = "Player Two"
// ) {
//   const board = Gameboard();

//   const players = [
//     {
//       name: playerOneName,
//       token: 1,
//     },
//     {
//       name: playerTwoName,
//       token: 2,
//     },
//   ];

//   let activePlayer = players[0]; // ^ Maybe it's convention putting information into array and objects.

//   const switchPlayerTurn = () => {
//     activePlayer = activePlayer === players[0] ? players[1] : players[0];
//   };
//   const getActivePlayer = () => activePlayer; // ^ It might also be the convention here.

//   const printNewRound = () => {
//     board.printBoard();
//     console.log(`${getActivePlayer().name}'s turn.`);
//   };

//   const playRound = (column) => {
//     // Drop a token for the current player
//     console.log(
//       `Dropping ${getActivePlayer().name}'s token into column ${column}...`
//     );
//     board.dropToken(column, getActivePlayer().token);

//     /*  This is where we would check for a winner and handle that logic,
//         such as a win message. */

//     // Switch player turn
//     switchPlayerTurn();
//     printNewRound();
//   };

//   // Initial play game message
//   printNewRound();

//   // For the console version, we will only use playRound, but we will need
//   // getActivePlayer for the UI version, so I'm revealing it now
//   return {
//     playRound,
//     getActivePlayer,
//   };
// }

// // /01. Game Initialization
// const game = GameController();
