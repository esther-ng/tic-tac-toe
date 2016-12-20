import $ from 'jquery';
import Backbone from 'backbone';

import CellView from 'app/views/cell_view';

var BoardView = Backbone.View.extend({
  initialize: function(options){
    // this.table = options.table;
    this.board = options.board.reduce(function(a,b){
      return a.concat(b);
    }, []);
    // // fill in html with this.board data
    this.cellViewList = [];
    for (var i = 0; i < this.board.length; i++) {
      // var cellSelector = ;
      var cellView = new CellView({
        el: this.$('td:eq(' + i + ')'),
        mark: null,
        klass: i.toString()
      });
      this.listenTo(cellView, 'coordinates', this.playMark);
      this.cellViewList.push(cellView);
    //   // cell.text(i);
    //   // console.log(cell);
    //   // for (var j = 0; j < this.board[i].length; j++)  {
    //   // }
    }
    this.rows = [this.$('.row1'), this.$('.row2'), this.$('.row3')];
    return this;
  },

  render: function(options) {
    this.board = options.board.reduce(function(a,b){
      return a.concat(b);
    }, []);
    console.log(options);
    this.cellViewList[options.cellNum].render(this.board[options.cellNum]);

    // var cellViewList = board;
    //
    // for (var j = 0; j < 3; j++) {
    //   cellViewList[j][j].render();
    //   this.rows[j]
    // })
    // fill in html with this.board data
    // for (var i = 0; i < this.board.length; i++) {
    //   // var cellSelector = ;
    //   var cellView = new CellView({
    //     el: this.$('td:eq(' + i + ')'),
    //     mark: this.board[i],
    //     klass: i.toString()
    //   });
    //   if (i<3){
    //     this.rows[0].append(cellView.)
    //   }
    //   this.listenTo(cellView, 'coordinates', this.playMark);
    //   // cell.text(i);
    //   // console.log(cell);
    //   // for (var j = 0; j < this.board[i].length; j++)  {
    //   // }
    // }
    // this.delegateEvents();
    // console.log(this.board);
    return this;
  },

  playMark: function(coordies){
    // e.stopPropagation();
    console.log('board view play mark' + coordies);
    this.trigger('play', coordies);
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
