import $ from 'jquery';
import Backbone from 'backbone';

var GameView = Backbone.View.extend({
  initialize: function(){
    this.boardView = new BoardView({
      board: this.model.board
    });
  },

  render: function() {
    this.boardView.render();
    return this;
  }
});

export default GameView;
