import $ from 'jquery';

import Application from 'app/models/application';
import ApplicationView from 'app/views/application_view';

$(document).ready(function() {
  var gamesList = new Application();
  // gamesList.fetch();
  var applicationView = new ApplicationView ({
    el: 'body',
    model: gamesList
  });
  applicationView.render();
  // console.log('gamemodels' + JSON.stringify(gamesList.models));
});
