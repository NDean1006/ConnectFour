/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById("board");
  htmlBoard.classList.add("grid");
  // TODO: add comment for this code
  let top = document.createElement("tr"); // create table row html element 
  
  top.setAttribute("id", "column-top-red"); // set the id atribute of top table row to "column-top"
  top.addEventListener("click", handleClick); // make top tr element exxecute handleClick funbcftion on click event 

  for (let x = 0; x < WIDTH; x++) { // loop fucntion for total width of board
    let headCell = document.createElement("td"); // create top cell of column 

    headCell.setAttribute("id", x);// set head cell id to incrmented value 
    top.append(headCell);//append cell tp top row 
  }
  htmlBoard.append(top);// appends top table row to board

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { // loop for length of hight variable 
    const row = document.createElement("tr"); // tables row with a starting postion of y0
    for (let x = 0; x < WIDTH; x++) { // loop for width variable 
      const cell = document.createElement("td"); // creats a cell 
      cell.setAttribute("id", `${y}-${x}`);// asignes an y,x id to cell 
      row.append(cell);// appends the cells in order from 0y,0x > 0y,7x. y will be increment after full exixcution of width loop.  
    }
    htmlBoard.append(row);//appends row 
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) { // loop through y postions 
    if (!board[y][x]) { // if not filled 
      return y; // return top empty postion 
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
  
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null || checkForWin() === true) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x]= currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
  // Toggle hover Icon by currPlayer 
  if (currPlayer !=  1){
    let top = document.getElementById("column-top-red");
    top.setAttribute("id", "column-top-blue"); 
  } else {
    let top = document.getElementById("column-top-blue");
    top.setAttribute("id", "column-top-red");
  }
  
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
