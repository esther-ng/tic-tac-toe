import $ from 'jquery';
import Backbone from 'backbone';

import Game from 'app/models/game';
import GameView from 'app/views/game_view';
import GameHistView from 'app/views/game_hist_view';

var ApplicationView = Backbone.View.extend({
  initialize: function(){
    this.model.fetch();
    this.listenTo(this.model, 'update', this.render);
    // this.listenTo()
    // this.listenTo(this, '')
    // this.gameHistory = [];
    // this.listenTo(this.model, 'change', )
    // return this;
  },

  render: function(){
    // this.delegateEvents();
    this.$('#games-list').empty();
    // this.gameHistory = [];
    this.showHistory(this.model);
    // this.model.fetch({reset: true, success: this.showHistory});
    // this.model.forEach(function(g){
    //   this.fillHistory(g);
    // }, this);
    // this.gameHistory.forEach(function(gv){
    //   gv.render();
    //   this.$('#games-list').append(gv.$el);
    // }, this);
    // console.log('list of games' + JSON.stringify(this.model) + this.model[0]);
    // this.showHistory(this);
    return this;
  },

  newGame: function(){
    this.game = new Game();
    this.gameView = new GameView({
      el: '#game',
      model: this.game
    });
    this.listenTo(this.gameView.model, 'gameover', this.showModal);
    // this.listenTo(this.gameView.model, 'sync', console.log('sync in application'));
    // this.listenTo(this.gameView.model, 'requested', console.log('requested in application'));
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
    // this.$('#games-list').hide();
  },

  showModal: function(outcome){
    var modal = this.$('#modal');
    $('#modal-text').text('the winner is ' + outcome);
    modal.show();
    this.$('#btn-save').hide();
    this.model.fetch();
    // this.showHistory();
    // console.log('this is the winner in appview' + outcome);
  },

  events: {
    'click #start': 'startPlaying',
    'click #close': 'closeModal',
    'click #play-again': 'resetPlay',
    'click #btn-save': 'getPlayerNames'
    // 'click #delete': 'deleteGame'
    // 'click #btn-history': 'showHistory'
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
    // console.log('this is the turn in appview' + this.game.turn.mark);
  },

  closeModal: function(e){
    this.$('#modal').hide();
  },

  showHistory: function(e){
    // $('#games-list').empty();
    // console.log(this.model);
    this.gameHistory = [];
    // this.model.fetch({reset: true});
    this.model.forEach(function(g){
      this.fillHistory(g);
    }, this);
    this.gameHistory.reverse().forEach(function(gv){
      gv.render();
      this.$('#games-list').append(gv.$el);
    }, this);
    // this.$('#games-list').show();
  },

  fillHistory: function(game){
    var card = new GameHistView({
      model: game
    });
    this.listenTo(card, 'deleteG', this.deleteGame);
    this.gameHistory.push(card);
  },

  deleteGame: function(e){
    e.destroy({success: this.render});
  }
});

export default ApplicationView;
