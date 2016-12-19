var Player = function() {

};

Player.prototype.setName = function(name) {
  this.name = name;
};

Player.prototype.setMark = function(mark) {
  this.mark = mark;
  // validation: accept only x or o
};

export default Player;
