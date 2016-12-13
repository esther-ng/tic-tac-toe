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

  describe()

  // describe('play', function(){
  //   // positive case
  //   it('should put a mark on an unoccupied spot based on the coordinates ', function(){
  //
  //   });
  //
  //   // negative case
  //
  // });
});
