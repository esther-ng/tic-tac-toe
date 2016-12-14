import Player from 'player';

var Game = function() {
  this.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  // instantiate 2 Player objects
  this.Player1 = new Player();
  this.Player2 = new Player();

  var players = [this.Player1, this.Player2];
  var randomIndex = Math.floor(Math.random() * players.length);

  this.turn = players[randomIndex];
  this.counter = 0;
  this.outcome = null;
};

Game.prototype.assignMark = function(){
  if (this.Player1.mark === "X") {
    this.Player2.setMark("O");
  } else if (this.Player1.mark === "O") {
    this.Player2.setMark("X");
  }
};

// var keepPlaying = function(){
//   if (checkWinner()){
//     return false;
//   } else {
//     return true;
//   }
// };

Game.prototype.keepPlaying = function(){
  // check rows
  this.board.forEach(function(row){
    if (row[0] === row[1] && row[1] === row[2] && row[2] !== null){
      if (this.Player1.mark === row[0]){
        this.outcome = this.Player1;
      } else {
        this.outcome = this.Player2;
      }
      return false;
    }
  });
  // check columns
  for (var i = 0; i > 2; i++){
    if (this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {
      if (this.Player1.mark === this.board[0][i]){
        this.outcome = this.Player1;
      } else {
        this.outcome = this.Player2;
      }
      return false;
    }
  }
  // check diagonals
  if ((this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) || (this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0])){
    if (this.Player1.mark == this.board[1][1]){
      this.outcome = this.Player1;
    } else {
      this.outcome = this.Player2;
    }
    return false;
  }
  // check if board is full and there is a tie
  if (this.counter === 9) {
    this.outcome = "tie";
    return false;
  }

  return true;
};

Game.prototype.play = function(x, y){
  if (this.board[x][y] === null) {
    this.board[x][y] = this.turn.mark;
    this.counter ++;
    if (this.counter >= 5) {
      if (this.keepPlaying() === false){
        return this.outcome;
      }
    }
    if (this.turn == this.Player1) {
      this.turn = this.Player2;
    } else {
      this.turn = this.Player1;
    }
  }
};

export default Game;
