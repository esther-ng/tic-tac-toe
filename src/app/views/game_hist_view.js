import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';
import GameView from 'app/views/game_view';

var GameHistView = Backbone.View.extend({
  initialize: function(options){
    this.template = _.template($("#tmpl-li").html());
    this.rec = options.model;
    // console.log('this is the rec' + JSON.stringify(this.rec.get('outcome')));
    this.time = new Date(options.model.get('played_at'));
    if (this.rec.get('outcome') === "X") {
      this.winner = this.rec.get('players')[0];
    } else if (this.rec.get('outcome') === "X") {
      this.winner = this.rec.get('players')[1];
    } else {
      this.winner = "Draw";
    }
  },

  render: function() {
    var html = this.template({outcome: this.winner, players: this.rec.get('players'), played_at: this.time});
    this.$el.html(html);
    // console.log(this.time);
    return this;
  },

  events: {
    'click li': 'triggerLoad',
    'click #delete': 'triggerDelete'
  },

  triggerDelete: function(e){
    this.trigger('deleteG', this.model);
    // console.log(this.model.get('id'
    // ));
  },

  triggerLoad: function(e){
    // e.stopPropagation();
    console.log('clicked on li' + this.model.id);
    this.model.fetch({success: this.showIt});
    // this.trigger('showGame', this.model)});
  },

  showIt: function(e){
    console.log(JSON.stringify(e));
    // this.trigger('showGame', e);

  //   console.log('fetching' + JSON.stringify(e));
  //   console.log('model' + JSON.stringify(this.model));
  //   var showing = new GameView({
  //     el: '#game',
  //     model: e
  //   });
  //   // console.log('Where the board' + e['board']);
  }
});

export default GameHistView;
