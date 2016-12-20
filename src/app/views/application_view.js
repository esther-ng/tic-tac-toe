import $ from 'jquery';
import Backbone from 'backbone';

import Game from 'app/models/game';
// import Player from 'app/models/game';
import GameView from 'app/views/game_view';

var ApplicationView = Backbone.View.extend({
  initialize: function(){
    var game = new Game();
    var gameView = new GameView({
      el: '#game',
      model: game
    });
    // gameView.render();
    this.listenTo(gameView, 'gameover', this.showModal);
  },

  render: function(){
    return this;
  },

  showModal: function(outcome){
    var modal = this.$('#modal');
    modal.show();
    console.log(outcome);
  }
});

export default ApplicationView;
