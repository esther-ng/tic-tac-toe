import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';

var GameHistView = Backbone.View.extend({
  initialize: function(options){
    this.template = _.template($("#tmpl-li").html());
    this.rec = options.model;
    // console.log('this is the rec' + JSON.stringify(this.rec.get('outcome')));
    this.time = new Date(options.model.get('played_at'));
  },

  render: function() {
    var html = this.template({outcome: this.rec.get('outcome'), players: this.rec.get('players'), played_at: this.time});
    this.$el.html(html);
    // console.log(this.time);
    return this;
  },
  events: {
    'click': 'triggerLoad'
  },

  triggerLoad: function(e){
    // e.stopPropagation();
    // console.log('clicked on cell view' + this.klass);
    // this.trigger('coordinates', this.klass);
  }
});

export default GameHistView;
