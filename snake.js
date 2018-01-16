import Coord from './coord';

class Snake {
  constructor(board) {
    this.direction = "U";
    this.segment = [5, 5];

  }

  Snake.prototype.move = () => {

  }

  turn(direction) {
    this.direction = direction
  }
}
