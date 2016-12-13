import Game from 'game';

describe('Game', function(){

  var testGame = new Game();

  describe('board', function(){
    it('should have 3 arrays', function(){
      expect(testGame.board.length).toEqual(3);
      expect(Array.isArray(testGame.board)).toBe(true);
    });

    it('should have 3 elements in each array of the Board array', function(){
      expect(testGame.board[0].length).toEqual(3);
      expect(Array.isArray(testGame.board[0])).toBe(true);
    });
  });

  describe('Player1', function(){
    it('should be a Player object', function(){
      expect(testGame.Player1).toBeTruthy();
    });

    it('should be able to setName and setMark of Player1', function(){
      testGame.Player1.setName('Kelly');
      testGame.Player1.setMark('O');
      expect(testGame.Player1.name).toEqual('Kelly');
      expect(testGame.Player1.mark).toEqual('O');
    });
  });

  describe('Player2', function(){
    it('should be a Player object', function(){
      expect(testGame.Player2).toBeTruthy();
    });

    it('should be able to setName and setMark of Player2', function(){
      testGame.Player2.setName('Esther');
      testGame.assignMark();
      expect(testGame.Player2.name).toEqual('Esther');
      expect(testGame.Player2.mark).toEqual('X');
    });
  });

  describe('turn', function(){
    it('should return a Player', function(){
      expect(testGame.turn).toBeDefined();
    });
  });

  describe('counter', function(){
    it('should start at 0 and keep track of valid turns', function(){
      expect(testGame.counter).toEqual(0);
    });
  });

  describe('play', function(){
    // positive case
    it('should put a mark on an unoccupied spot based on the coordinates ', function(){
      testGame.turn = testGame.Player1;
      testGame.play(0,2);
      expect(testGame.board[0][2]).toEqual('O');
    });

    // negative case

  });
});
