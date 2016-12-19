import Backbone from 'backbone';

var BoardView = Backbone.View.extend({
  initialize: function(options){
    this.board = options.board;
  },

  render: function() {
    // fill in html with this.board data
    return this;
  }
});

export default BoardView;
