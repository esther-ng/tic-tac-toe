import $ from 'jquery';
import Backbone from 'backbone';

import BoardView from 'app/views/board_view';

var GameView = Backbone.View.extend({
  initialize: function(){
    this.boardView = new BoardView({
      board: this.model.board,
      el: this.$('#board'),
    });
    this.listenTo(this.boardView, 'play', this.playIt);
    this.turn = "X";
  },

  render: function() {
    $('#turn').text('Turn ' + this.turn);
    this.boardView.render();
    return this;
  },

  playIt: function(e){
    console.log('now actally play from the model');
    this.model.play(0,0);
  }
});

export default GameView;
