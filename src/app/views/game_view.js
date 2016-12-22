import $ from 'jquery';
import Backbone from 'backbone';

import BoardView from 'app/views/board_view';

var GameView = Backbone.View.extend({
  initialize: function(){
    this.boardView = new BoardView({
      board: this.model.get('board'),
      el: this.$('#board'),
    });
    this.$('#status').empty();
    this.listenTo(this.boardView, 'play', this.playIt);
    this.turn = this.model.turn.mark;
    // this.listenTo(this.model, 'change:board', console.log('board has changed!'));
    // this.listenTo(this.model, 'sync', console.log('Synced'));
    // this.listenTo(this.model, 'request', console.log('requested'));
    // return this;
  },

  render: function(coordinates) {
    // this.delegateEvents();
    this.$('#status').text('GO ' + this.model.turn.mark);
    this.boardView.render({
      board: this.model.get('board'),
      cellNum: coordinates
    });
    return this;
  },

  playIt: function(e){
    // console.log('now actually play from the model inside game view play it' + e);
    var coordinatesLookup = {
      '0': [0,0],
      '1': [0,1],
      '2': [0,2],
      '3': [1,0],
      '4': [1,1],
      '5': [1,2],
      '6': [2,0],
      '7': [2,1],
      '8': [2,2]
    };
    // console.log(coordinatesLookup[e]);
    // this.coordinates = e;
    if (this.model.play(coordinatesLookup[e]) === undefined){
      this.render(e);
    } else {
      this.render(e);
      this.$('#status').html("<p>Game Over</p><p> Winner is " + this.model.get('outcome')+ "</p>");
      this.model.trigger('gameover',  this.model.get('outcome'));
    }
    // console.log(this.model.get('board'));
    // // console.log(this.model.toJSON());
    // console.log('has the model changed inside game view' + this.model.hasChanged());
  }
});

export default GameView;
