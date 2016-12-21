import $ from 'jquery';
import Backbone from 'backbone';

import Game from 'app/models/game';
// import Player from 'app/models/game';
import GameView from 'app/views/game_view';

var ApplicationView = Backbone.View.extend({
  initialize: function(){
    // this.game = new Game();
    // var gameView = new GameView({
    //   el: '#game',
    //   model: this.game
    // });
    // gameView.render();
    // this.listenTo(this.gameView.model, 'gameover', this.showModal);
    // this.listenTo(this, '')
  },

  render: function(){
    this.delegateEvents();
    console.log('list of games' + JSON.stringify(this.model));
    return this;
  },

  newGame: function(){
    this.game = new Game();
    this.gameView = new GameView({
      el: '#game',
      model: this.game
    });
    this.listenTo(this.gameView.model, 'gameover', this.showModal);
  },

  getPlayerNames: function(e){
    e.preventDefault();
    this.game.Player1.setName( this.$("input[name='player-x']").val());
    this.game.Player1.setMark("X");
    this.game.Player2.setName(this.$("input[name='player-o']").val());
    this.game.assignMark();
    this.game.set('players', [this.game.Player1.name, this.game.Player2.name]);
    console.log(this.game.get('players'));
    $('#turn').text(this.game.turn.mark + ' goes first!');
    this.$('#modal').hide();
    // $('#close').text('CLOSE');
  },

  showModal: function(outcome){
    var modal = this.$('#modal');
    $('#modal-text').text('the winner is ' + outcome);
    modal.show();
    this.$('#btn-save').hide();
    console.log('this is the winner in appview' + outcome);
  },

  events: {
    'click #start': 'startPlaying',
    'click #close': 'closeModal',
    'click #play-again': 'resetPlay',
    'click #btn-save': 'getPlayerNames'
  },

  resetPlay: function(e){
    $('#modal-text').text("Who's Playing?");
    this.$("#btn-save").show();
    this.$("input[name='player-x']").val('');
    this.$("input[name='player-o']").val('');
    this.startPlaying();
    this.$('#start').show();
    // this.$('#modal').hide();
  },

  startPlaying: function(e){
    this.newGame();
    var modal = this.$('#modal');
    modal.show();
    console.log('this is the turn in appview' + this.game.turn.mark);
  },

  closeModal: function(e){
    this.$('#modal').hide();
    // this.$('#start').hide();
  }
});

export default ApplicationView;
