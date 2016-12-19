import $ from 'jquery';

import Game from 'app/models/game';
// import Player from 'app/models/game';
import GameView from 'app/views/game_view';

$(document).ready(function() {
  var game = new Game();
  var gameView = new GameView({
    el: 'body',
    model: game
  });
  gameView.render();
});
