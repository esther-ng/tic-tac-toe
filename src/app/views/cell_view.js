import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';

var CellView = Backbone.View.extend({
  initialize: function(options){
    this.klass = options.klass;
    this.$el.addClass(this.klass);
    // this.template = _.template($("#tmpl-cell").html());
    this.mark = options.mark;
    this.$el.text(this.mark);
  },

  render: function() {
    // var html = this.template({mark: this.mark});

    this.delegateEvents();
    return this;
  },

  events: {
    'click': 'triggerMark'
  },

  triggerMark: function(e){
    console.log('clicked' + this.klass);
    this.trigger('coordinates', this.klass);
  }
});

export default CellView;
