import $ from 'jquery';

// import Player from 'app/models/game';
import ApplicationView from 'app/views/application_view';

$(document).ready(function() {
  var applicationView = new ApplicationView ({
    el: 'body',
    // model: game
  });
  applicationView.render();
});
