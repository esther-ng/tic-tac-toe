import $ from 'jquery';
import Backbone from 'backbone';

import Game from 'app/models/game';
import GameView from 'app/views/game_view';
import GameHistView from 'app/views/game_hist_view';

var ApplicationView = Backbone.View.extend({
  initialize: function(){
    this.model.fetch();
    this.listenTo(this.model, 'update', this.render);
  },

  render: function(){
    this.$('#games-list').empty();
    this.showHistory(this.model);
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
    // console.log(this.game.get('players'));
    $('#status').text(this.game.turn.mark + ' goes first!');
    this.$('#modal').hide();
    this.$('#players').html("Player X: " + this.game.Player1.name + "<br>vs<br>" + "Player O: " + this.game.Player2.name);
  },

  showModal: function(outcome){
    var modal = this.$('#modal');
    $('#modal-text').text('the winner is ' + outcome);
    modal.show();
    this.$('#btn-save').hide();
    this.model.fetch();
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
  },

  startPlaying: function(e){
    this.newGame();
    var modal = this.$('#modal');
    modal.show();
  },

  closeModal: function(e){
    this.$('#modal').hide();
  },

  showHistory: function(e){
    this.gameHistory = [];
    this.model.forEach(function(g){
      this.fillHistory(g);
    }, this);
    this.gameHistory.reverse().forEach(function(gv){
      gv.render();
      this.$('#games-list').append(gv.$el);
    }, this);
  },

  fillHistory: function(game){
    var card = new GameHistView({
      model: game
    });
    this.listenTo(card, 'deleteG', this.deleteGame);
    this.listenTo(card, 'showGame', this.showGame);
    this.gameHistory.push(card);
  },

  showGame: function(e){
    // console.log('received in app' + JSON.stringify(e.players));
    // e.fetch({success: this.newGameView(e.get('id'))});
    // this.listenTo(this.gameView.model, 'gameover', this.showModal);
    // var showGm = new Game({
    //   attributes: e
    // });
    // console.log(JSON.stringify(showGm));
    // console.log(JSON.stringify(this.model.findWhere({id: e.get('id')})));
    // var showGameView = new GameView({
    //   el: '#game',
    //   model: e
    // });
    // this.listenTo(showGameView.model, 'update', console.log('trying to render' + showGameView.model.get('board')));
  },
  //
  // newGameView: function(model){
  // },

  deleteGame: function(e){
    e.destroy({success: this.render});
  }
});

export default ApplicationView;
