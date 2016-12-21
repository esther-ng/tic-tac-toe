import $ from 'jquery';

import Application from 'app/models/application';
import ApplicationView from 'app/views/application_view';

$(document).ready(function() {
  var gamesList = new Application();
  gamesList.fetch({success: function(){
    // console.log('gameslist models' + gamesList.models[0].get('outcome')); // => 2 (collection have been populated)
  }});
  // console.log('gamemodels' + JSON.stringify(gamesList.models));
  var applicationView = new ApplicationView ({
    el: 'body',
    model: gamesList
  });
  applicationView.render();
});
