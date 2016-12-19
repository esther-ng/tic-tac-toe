import Game from 'app/models/game';

describe('Game', function(){

  var testGame = new Game();

  describe('board', function(){
    it('should have 3 arrays', function(){
      expect(testGame.get('board').length).toEqual(3);
      expect(Array.isArray(testGame.get('board'))).toBe(true);
    });

    it('should have 3 elements in each array of the Board array', function(){
      expect(testGame.get('board')[0].length).toEqual(3);
      expect(Array.isArray(testGame.get('board')[0])).toBe(true);
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

  describe('outcome', function(){
    it('should have a null value at the beginning of the game', function(){
      expect(testGame.get('outcome')).toEqual(null);
    });
  });

  describe('keepPlaying()', function(){
    // if there is a winning row
    it('should return false if there is a winning row', function(){
      var winningRowGame = new Game();
      winningRowGame.Player1.setName("Kelly");
      winningRowGame.Player1.setMark("O");
      winningRowGame.Player2.setName("Esther");
      winningRowGame.assignMark();
      winningRowGame.turn = winningRowGame.Player2;
      winningRowGame.play(2,0); // x
      winningRowGame.play(1,0); // o
      winningRowGame.play(2,1); // x
      winningRowGame.play(1,1); // o
      winningRowGame.play(2,2); // x
      expect(winningRowGame.keepPlaying()).toEqual(false);
      expect(winningRowGame.get('outcome')).toEqual(winningRowGame.Player2.mark);
    });

    // if there is a winning column
    it('should return false if there is a winning column', function(){
      var winningColumnGame = new Game({});
      // console.log(winningColumnGame.get('board'));
      winningColumnGame.Player1.setName("Kelly");
      winningColumnGame.Player1.setMark("O");
      winningColumnGame.Player2.setName("Esther");
      winningColumnGame.assignMark();
      winningColumnGame.turn = winningColumnGame.Player2;
      // console.log(winningColumnGame.get('board'));
      // console.log(winningColumnGame.turn);
      winningColumnGame.play(0,2); // x
      // console.log(winningColumnGame.get('board'));
      // console.log(winningColumnGame.turn);
      winningColumnGame.play(1,0); // o
      // console.log(winningColumnGame.get('board'));
      // console.log(winningColumnGame.turn);
      winningColumnGame.play(1,2); // x
      // console.log(winningColumnGame.get('board'));
      // console.log(winningColumnGame.turn);
      winningColumnGame.play(1,1); //
      // console.log(winningColumnGame.get('board'));
      // console.log(winningColumnGame.turn);
      winningColumnGame.play(2,2); // x
      // console.log(winningColumnGame.get('board'));
      // console.log(winningColumnGame.turn);
      // console.log(winningColumnGame.get('board'));
      expect(winningColumnGame.keepPlaying()).toEqual(false);
      expect(winningColumnGame.get('outcome')).toEqual(winningColumnGame.Player2.mark);
    });

    // if there is winning diagonal
    it('should return false if there is a winning diagonal', function(){
      var winningDiagonalGame = new Game();
      winningDiagonalGame.Player1.setName("Kelly");
      winningDiagonalGame.Player1.setMark("O");
      winningDiagonalGame.Player2.setName("Esther");
      winningDiagonalGame.assignMark();
      winningDiagonalGame.turn = winningDiagonalGame.Player2;
      winningDiagonalGame.play(0,2); // x
      winningDiagonalGame.play(1,0); // o
      winningDiagonalGame.play(1,1); // x
      winningDiagonalGame.play(2,1); // o
      winningDiagonalGame.play(2,0); // x
      expect(winningDiagonalGame.keepPlaying()).toEqual(false);
      expect(winningDiagonalGame.get('outcome')).toEqual(winningDiagonalGame.Player2.mark);
    });

    // check if there is a tie and keep playing == false
    it('should return false if there is a tie', function(){
      var tieGame = new Game();
      tieGame.Player1.setName("Kelly");
      tieGame.Player1.setMark("O");
      tieGame.Player2.setName("Esther");
      tieGame.assignMark();
      tieGame.turn = tieGame.Player2;
      // console.log("First turn: " + tieGame.turn.name);
      // console.log(tieGame.keepPlaying());
      tieGame.play(0,1); // x
      // console.log("2nd turn: " + tieGame.turn.name);
      // console.log(tieGame.keepPlaying());
      tieGame.play(0,0); // o
      // console.log("3rd turn: " + tieGame.turn.name);
      // console.log(tieGame.keepPlaying());
      tieGame.play(1,1); // x
      // console.log("4th turn: " + tieGame.turn.name);
      // console.log(tieGame.keepPlaying());
      tieGame.play(0,2); // o
      // console.log("5th turn: " + tieGame.turn.name);
      // console.log(tieGame.keepPlaying());
      tieGame.play(1,2); // x
      // console.log("6th turn: " + tieGame.turn.name);
      // console.log(tieGame.keepPlaying());
      tieGame.play(1,0); // o
      // console.log("7th turn: " + tieGame.turn.name);
      // console.log(tieGame.keepPlaying());
      tieGame.play(2,0); // x
      // console.log("8th turn: " + tieGame.turn.name);
      // console.log(tieGame.keepPlaying());
      tieGame.play(2,1); // o
      // console.log("9th turn: " + tieGame.turn.name);
      // console.log(tieGame.keepPlaying());
      tieGame.play(2,2); // x
      // console.log(tieGame.board);
      expect(tieGame.keepPlaying()).toEqual(false);
      expect(tieGame.get('outcome')).toEqual("draw");
    });

    // check if there is no winner yet and keep playing == true
    it('should return true when there is no winner yet', function(){
      var continuedGame = new Game();
      continuedGame.Player1.setName("Kelly");
      continuedGame.Player1.setMark("O");
      continuedGame.Player2.setName("Esther");
      continuedGame.assignMark();
      continuedGame.turn = continuedGame.Player2;
      // console.log("First turn: " + continuedGame.turn.name);
      // console.log(continuedGame.keepPlaying());
      continuedGame.play(0,1); // x
      // console.log("2nd turn: " + continuedGame.turn.name);
      // console.log(continuedGame.keepPlaying());
      continuedGame.play(0,0); // o
      // console.log("3rd turn: " + continuedGame.turn.name);
      // console.log(continuedGame.keepPlaying());
      continuedGame.play(1,1); // x
      // console.log("4th turn: " + continuedGame.turn.name);
      // console.log(continuedGame.keepPlaying());
      continuedGame.play(0,2); // o
      // console.log("5th turn: " + continuedGame.turn.name);
      // console.log(continuedGame.keepPlaying());
      continuedGame.play(1,2); // x
      // console.log("6th turn: " + continuedGame.turn.name);
      // console.log(continuedGame.keepPlaying());
      continuedGame.play(1,0); // o
      expect(continuedGame.keepPlaying()).toEqual(true);
      expect(continuedGame.get('outcome')).toEqual(null);
    });

  });

  describe('play', function(){
    // positive case: player places a valid move. also test the counter and turn
    it('should put a mark on an unoccupied spot based on the coordinates ', function(){
      var beforeCounter = testGame.counter;
      testGame.turn = testGame.Player1;
      testGame.play(0,2);
      expect(testGame.get('board')[0][2]).toEqual('O');
      expect(beforeCounter + 1).toEqual(testGame.counter);
      expect(testGame.turn).toEqual(testGame.Player2);
    });

    // negative case: player places an invalid move.  also test the counter and turn
    it('should not change a mark on an occupied spot based on the coordinates ', function(){
      var beforeCounter = testGame.counter;
      testGame.get('board')[1][2] = "X";
      testGame.turn = testGame.Player1;
      testGame.play(1,2);
      expect(testGame.get('board')[1][2]).toEqual('X');
      expect(beforeCounter).toEqual(testGame.counter);
      expect(testGame.turn).not.toEqual(testGame.Player2);
    });

    // if there's a winner after 5 moves
    it('starting from the 5th play, should check if there is a winner before the next turn', function(){
      var testGame2 = new Game();
      testGame2.Player1.setName("Kelly");
      testGame2.Player1.setMark("O");
      testGame2.Player2.setName("Esther");
      testGame2.assignMark();
      testGame2.turn = testGame2.Player2;
      testGame2.play(0,0); // x
      testGame2.play(0,1); // o
      testGame2.play(1,1); // x
      testGame2.play(1,2); // o
      expect(testGame2.play(2,2)).toEqual(testGame2.Player2.mark);
    });

    // if the board is full and we have a winner
    it('should be able to identify the winner when the board is full and one player has a clear win', function(){
      var fullGame = new Game();
      fullGame.Player1.setName("Kelly");
      fullGame.Player1.setMark("O");
      fullGame.Player2.setName("Esther");
      fullGame.assignMark();
      fullGame.turn = fullGame.Player2;
      // Now we play 8 times
      fullGame.play(2,1); // x
      fullGame.play(1,1); // o
      fullGame.play(1,2); // x
      fullGame.play(0,0); // o
      fullGame.play(2,2); // x
      fullGame.play(0,1); // o
      fullGame.play(1,0); // x
      fullGame.play(2,0); // o
      // Before we play the last move that would fill the board, we should:
      // check that outcome is still null
      expect(fullGame.get('outcome')).toEqual(null);
      // check the counter
      expect(fullGame.counter).toEqual(8);
      // check the status
      expect(fullGame.keepPlaying()).toEqual(true);
      // when we play the last move, it should declare the winner
      expect(fullGame.play(0,2)).toEqual(fullGame.Player2.mark);
      expect(fullGame.counter).toEqual(9);
    });

  });
});
