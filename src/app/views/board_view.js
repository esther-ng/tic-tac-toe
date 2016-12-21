import $ from 'jquery';
import Backbone from 'backbone';

import CellView from 'app/views/cell_view';

var BoardView = Backbone.View.extend({
  initialize: function(options){
    this.board = options.board.reduce(function(a,b){
      return a.concat(b);
    }, []);
    // // fill in html with this.board data
    this.cellViewList = [];
    for (var i = 0; i < this.board.length; i++) {
      var cellView = new CellView({
        el: this.$('td:eq(' + i + ')'),
        mark: null,
        klass: i.toString()
      });
      this.listenTo(cellView, 'coordinates', this.playMark);
      this.cellViewList.push(cellView);
    }
    this.rows = [this.$('.row1'), this.$('.row2'), this.$('.row3')];
    return this;
  },

  render: function(options) {
    this.board = options.board.reduce(function(a,b){
      return a.concat(b);
    }, []);
    // console.log(options);
    this.cellViewList[options.cellNum].render(this.board[options.cellNum]);

    return this;
  },

  playMark: function(coordies){
    // e.stopPropagation();
    // console.log('board view play mark' + coordies);
    this.trigger('play', coordies);
  }

});

export default BoardView;
