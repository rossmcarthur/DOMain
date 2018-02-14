import Coord from './coord';

class Snake {
  constructor(board) {
    this.direction = "D";
    this.board = board;
    const cent = new Coord(10, 10);
    this.segments = [cent];
    this.addLength = false;
  }

  head() {
    return this.segments[this.segments.length - 1];
  }

  occupied(coords) {
    let result = false;
    for(let i = 0; i < this.segments.length; i++) {
      const snakeCoords = this.segments[i];
      if (snakeCoords.x === coords[0] && snakeCoords.y === coords[1]) {
        result = true;
        return result;
      }
    }
    return result;
  }

  move() {
    this.segments.push(this.head().plus(Snake.MOVEMENTS[this.direction]));
    if (!this.addLength) {
      this.segments.shift();
    } 

  }

  turn(direction) {
    if (Snake.MOVEMENTS[this.direction].isOpposite(Snake.MOVEMENTS[direction])) {
      return;
    } else {
      this.direction = direction;
    }
  }

}

Snake.MOVEMENTS = {
  "U": new Coord(-1, 0),
  "R": new Coord(0, 1),
  "D": new Coord(1, 0),
  "L": new Coord(0, -1)
};

export default Snake;
