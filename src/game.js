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
};

Game.prototype.assignMark = function(){
  if (this.Player1.mark === "X") {
    this.Player2.setMark("O");
  } else if (this.Player1.mark === "O") {
    this.Player2.setMark("X");
  }
};

Game.prototype.play = function(x, y){
  if (this.board[x][y] === null) {
    this.board[x][y] = this.turn.mark;
    this.counter ++;
    // if (this.counter >= 5) {
    //   this.checkStatus();
    // }
    if (this.turn == this.Player1) {
      this.turn = this.Player2;
    } else {
      this.turn = this.Player1;
    }
  }
};

export default Game;
