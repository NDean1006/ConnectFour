/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
class Game {
  constructor(p1, p2, HEIGHT = 6, WIDTH = 7){
    this.players = [p1, p2];
    this.HEIGHT = HEIGHT;
    this.WIDTH = WIDTH;
    this.currPlayer = p1;
    this.makeBoard();
    this.makeHtmlBoard();
  }
  /** makeBoard: create in-JS board structure:
   *    board = array of rows, each row is array of cells  (board[y][x])
   */
  makeBoard() {
    this.board = [];
    for (let i = 0; i < this.HEIGHT; i++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }
  /** makeHtmlBoard: make HTML table and row of column tops. */
  makeHtmlBoard() {
    const htmlBoard = document.getElementById("board");
    htmlBoard.classList.add("grid");

    const top = document.createElement("tr"); // create table row html element 
    top.setAttribute("id", "column-top-red"); // set the id atribute of top table row to "column-top"
    top.addEventListener("click", this.handleClick.bind(this)); // make top tr element exxecute handleClick funbcftion on click event 
    for (let x = 0; x < this.WIDTH; x++) { // loop fucntion for total width of board
      let headCell = document.createElement("td"); // create top cell of column 
      headCell.setAttribute("id", x);// set head cell id to incrmented value 
      top.append(headCell);//append cell tp top row 
    }
    htmlBoard.append(top);// appends top table row to board
    for (let y = 0; y < this.HEIGHT; y++) { // loop for length of hight variable 
      const row = document.createElement("tr"); // tables row with a starting postion of y0
      for (let x = 0; x < this.WIDTH; x++) { // loop for width variable 
        const cell = document.createElement("td"); // creats a cell 
        cell.setAttribute("id", `${y}-${x}`);// asignes an y,x id to cell 
        row.append(cell);// appends the cells in order from 0y,0x > 0y,7x. y will be increment after full exixcution of width loop.  
      }
      htmlBoard.append(row);//appends row 
    }
  }
/** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) { // loop through y postions 
      if (!this.board[y][x]) { // if not filled 
        return y; // return top empty postion 
      }
    }
    return null;
  }
  /** placeInTable: update DOM to place piece into HTML table of board */
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.color;
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece); 
  }
/** endGame: announce game end */
  endGame(msg) {
    alert(msg)
  }
/** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null || this.checkForWin() === true) {
      return;
    }
    // place piece in board and add to HTML table
    this.board[y][x]= this.currPlayer;
    this.placeInTable(y, x);
    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer} won!`);
    }
    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
    // switch players
    this.currPlayer =
    this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    // Toggle hover Icon by currPlayer 
    if (this.currPlayer !=  this.players[0]){
      let top = document.getElementById("column-top-red");
      top.setAttribute("id", "column-top-blue"); 
    } else {
      let top = document.getElementById("column-top-blue");
      top.setAttribute("id", "column-top-red");
    }
  }
/** checkForWin: check board cell-by-cell for "does a win start here?" */
    checkForWin() {
    const _win = cells => 
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    
  for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
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

  
}
class Player {
  constructor(color) {
    this.color = color;
  }
}
document.getElementById("new-game").addEventListener('click', ()=>{
  
  let p1 = new Player(document.getElementById('p1-color').value);
  let p2 = new Player(document.getElementById('p2-color').value);
  new Game(p1,p2);
});










  
