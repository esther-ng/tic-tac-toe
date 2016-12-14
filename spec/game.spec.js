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

  describe('keepPlaying()', function(){
    // if there is a winning columns
    it('should return false if there is a winning column', function(){
      var winningRowGame = new Game();
      winningRowGame.Player1.setName("Kelly");
      winningRowGame.Player1.setMark("O");
      winningRowGame.Player2.setName("Esther");
      winningRowGame.assignMark();
      winningRowGame.turn = winningRowGame.Player2;
      winningRowGame.play(0,2); // x
      winningRowGame.play(1,0); // o
      winningRowGame.play(1,2); // x
      winningRowGame.play(1,1); // o
      // console.log(winningRowGame.board);
      // console.log(winningRowGame.turn);
      // console.log(winningRowGame.Player1.mark);
      winningRowGame.play(2,2); // x
      // console.log(winningRowGame.board);
      expect(winningRowGame.keepPlaying()).toEqual(false);
      expect(winningRowGame.outcome).toEqual(winningRowGame.Player2);
    });
  });

  describe('play', function(){
    // positive case, also test the counter and turn
    it('should put a mark on an unoccupied spot based on the coordinates ', function(){
      var beforeCounter = testGame.counter;
      testGame.turn = testGame.Player1;
      testGame.play(0,2);
      expect(testGame.board[0][2]).toEqual('O');
      expect(beforeCounter + 1).toEqual(testGame.counter);
      expect(testGame.turn).toEqual(testGame.Player2);
    });

    // negative case, also test the counter and turn
    it('should not change a mark on an occupied spot based on the coordinates ', function(){
      var beforeCounter = testGame.counter;
      testGame.board[1][2] = "X";
      testGame.turn = testGame.Player1;
      testGame.play(1,2);
      expect(testGame.board[1][2]).toEqual('X');
      expect(beforeCounter).toEqual(testGame.counter);
      expect(testGame.turn).not.toEqual(testGame.Player2);
    });

    // if there's a winner...
    it('starting from the 5th play, should check if there is a winner before the next turn', function(){
      var testGame2 = new Game();
      testGame2.Player2.setName("Esther");
      testGame2.Player1.setName("Kelly");
      testGame2.Player1.setMark("O");
      testGame2.assignMark();
      testGame2.turn = testGame2.Player2;
      testGame2.play(0,0); // x
      // console.log("after first play" + testGame2.turn.name);
      // console.log("after first play" + testGame2.board[0][0]);
      testGame2.play(0,1); // o
      // console.log("after second play" + testGame2.turn.name);
      // console.log("after second play" + testGame2.board[0][1]);
      testGame2.play(1,1); // x
      testGame2.play(1,2); // o
      testGame2.play(2,2); // x
      // console.log(testGame2.counter);
      // console.log(testGame2.turn.name);
      // console.log(testGame2.keepPlaying());
      // console.log(testGame2.board);
      expect(testGame2.outcome).toEqual(testGame2.Player2);
    });
    // if there's no winner yet
    // it('starting from the 5th play, should check if there is a winner before the next turn', function(){
    //   testGame.turn = testGame.Player2;
    //   testGame.play(0,0); // x
    //   testGame.play(0,1); // o
    //   testGame.play(1,1); // x
    //   testGame.play(1,2); // o
    //   testGame.play(2,2); // x
    //   expect(testGame.winner).toEqual(testGame.Player2);
    // });

  });
});
