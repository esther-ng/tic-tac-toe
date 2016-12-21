import $ from 'jquery';
import Backbone from 'backbone';

import Game from 'app/models/game';
import GameView from 'app/views/game_view';
import GameHistView from 'app/views/game_hist_view';

var ApplicationView = Backbone.View.extend({
  initialize: function(){

    // this.listenTo(this.gameView.model, 'gameover', this.showModal);
    // this.listenTo(this, '')
    // this.gameHistory = [];
    // this.listenTo(this.model, 'change', )
  },

  render: function(){
    this.delegateEvents();
    // console.log('list of games' + JSON.stringify(this.model) + this.model[0]);
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
    $('#turn').text(this.game.turn.mark + ' goes first!');
    this.$('#modal').hide();
    this.$('#games-list').hide();
  },

  showModal: function(outcome){
    var modal = this.$('#modal');
    $('#modal-text').text('the winner is ' + outcome);
    modal.show();
    this.$('#btn-save').hide();
    // console.log('this is the winner in appview' + outcome);
  },

  events: {
    'click #start': 'startPlaying',
    'click #close': 'closeModal',
    'click #play-again': 'resetPlay',
    'click #btn-save': 'getPlayerNames',
    'click #btn-history': 'showHistory'
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
    this.$('#games-list').empty();
    this.gameHistory = [];
    this.model.fetch({reset: true});
    this.model.forEach(function(g){
      this.fillHistory(g);
    }, this);
    this.gameHistory.forEach(function(gv){
      gv.render();
      this.$('#games-list').append(gv.$el);
    }, this);
    this.$('#games-list').show();
  },

  fillHistory: function(game){
    var card = new GameHistView({
      model: game
    });
    this.gameHistory.push(card);
  }
});

export default ApplicationView;
