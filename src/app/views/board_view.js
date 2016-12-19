import $ from 'jquery';
import Backbone from 'backbone';

import CellView from 'app/views/cell_view';

var BoardView = Backbone.View.extend({
  initialize: function(options){
    this.board = options.board.reduce(function(a,b){
      return a.concat(b);
    }, []);
    // this.table = options.table;
  },

  render: function() {
    // fill in html with this.board data
    for (var i = 0; i < this.board.length; i++) {
      // var cellSelector = ;
      var cellView = new CellView({
        el: this.$('td:eq(' + i + ')'),
        mark: this.board[i],
        klass: i.toString()
      });
      this.listenTo(cellView, 'coordinates', this.playMark);
      // cell.text(i);
      // console.log(cell);
      // for (var j = 0; j < this.board[i].length; j++)  {
      // }
    }
    this.delegateEvents();
    return this;
  },

  playMark: function(e){
    console.log('playing' + e);
    this.trigger('play', e);
  }

  // events: {
  //   'click td': 'logCell'
  // },
  //
  // logCell: function(e){
  //   console.log('clicked' + JSON.stringify(e.target));
  // }
});

export default BoardView;
