import Player from 'app/models/player';
import Game from 'app/models/game';

describe('Player', function(){

  var testPlayer = new Player();
  var testGame = new Game();

  describe('setName', function(){
    it('should set a Name attribute ', function(){
      testPlayer.setName('foobar');
      expect(testPlayer.name).toEqual('foobar');
    });
  });

  describe('setMark', function(){
    it('should set a Mark attribute', function(){
      testPlayer.setMark('x');
      expect(testPlayer.mark).toEqual('x');
    });
  });

  // on/off turn will be handled by the turn function in Game class
});
