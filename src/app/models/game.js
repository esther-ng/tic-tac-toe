import Backbone from 'backbone';
import Player from './player';

var Game = Backbone.Model.extend({
  defaults: {
    // board:
    //   // ["0", "1", "2"],
    //   // ["3", "4", "5"],
    //   // ["6", "7", "8"]
    // ],
    // players: [],
    outcome: null
  },
// initialize(attributes, options) -- we've been calling attributes options
  initialize: function(attributes, options){
    this.set('board', [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);

    this.set('players', []);
    // instantiate 2 Player objects
    this.Player1 = new Player();
    this.Player2 = new Player();

    var players = [this.Player1, this.Player2];
    var randomIndex = Math.floor(Math.random() * players.length);

    this.turn = players[randomIndex];
    this.counter = 0;
    // this.outcome = null;
  },

  assignMark: function(){
    if (this.Player1.mark === "X") {
      this.Player2.setMark("O");
    } else if (this.Player1.mark === "O") {
      this.Player2.setMark("X");
    }
  },

  findPlayer: function(coord){
    if (this.Player1.mark == this.get('board')[coord][coord]){
      this.set('outcome', this.Player1.mark);
    } else {
      this.set('outcome', this.Player2.mark);
    }
  },

  keepPlaying: function(){
    // check rows & columns
    for (var i = 0; i < 3; i++){
      if (((this.get('board')[i][0] == this.get('board')[i][1] && this.get('board')[i][1] == this.get('board')[i][2]) || (this.get('board')[0][i] == this.get('board')[1][i] && this.get('board')[1][i] == this.get('board')[2][i])) && this.get('board')[i][i] !== null) {
        this.findPlayer(i);
        return false;
      }
    }

    // check diagonals
    if ((this.get('board')[0][0] == this.get('board')[1][1] && this.get('board')[1][1] == this.get('board')[2][2] && this.get('board')[1][1] !== null) || (this.get('board')[0][2] == this.get('board')[1][1] && this.get('board')[1][1] == this.get('board')[2][0] && this.get('board')[1][1] !== null)){
      this.findPlayer(1);
      return false;
    }

    // check if board is full and there is a tie
    if (this.counter === 9) {
      this.set('outcome', "draw");
      return false;
    }

    return true;
  },

  nextTurn: function(){
    if (this.turn == this.Player1) {
      this.turn = this.Player2;
    } else {
      this.turn = this.Player1;
    }
  },

  play: function(coord){
    var x = coord[0];
    var y = coord[1];
    var boardArray = this.get('board');
    // console.log(boardArray);
    // console.log(coord);
    // console.log(boardArray[x][y]);
    if (boardArray[x][y] === null) {
      // console.log('inside board if' + this.turn.mark);
      boardArray[x][y] = this.turn.mark;
      this.set('board', boardArray);
      // console.log('model changed?' + JSON.stringify(this.changedAttributes('board')));
      this.counter ++;
      if (this.counter >= 5) {
        if (this.keepPlaying() === false){
          return this.get('outcome');
        }
      }
      this.nextTurn();
    }
  }
});


export default Game;
