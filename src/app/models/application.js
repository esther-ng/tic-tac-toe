import Backbone from 'backbone';
import _ from 'underscore';
import Game from './game';

var Application = Backbone.Collection.extend({
  model: Game,
  url: 'http://quiet-dawn-33248.herokuapp.com/api/v1/games',
  parse: function(data) {
    console.log('this the data' + JSON.stringify(data));
    return data;
  }
});

export default Application;
