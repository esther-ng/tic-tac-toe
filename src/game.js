var Game = function() {
  this.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  // instantiate 2 Player objects
  this.Player1 = new Player();
  this.Player2 = new Player();

};


export default Game;
