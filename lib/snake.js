import Coord from './coord';

class Snake {
  constructor(board) {
    this.direction = "D";
    this.board = board;
    const cent = new Coord(10, 10);
    this.segments = [cent];
    this.addLength = 0;
  }

  collides() {
    if (!this.board.valid(this.head())) {
      return false;
    }

  for(let i = 0; i < this.segments.length - 1; i++) {
    if (this.segments[i].equals(this.head())) {
      return false;
    }
  }

    return true;
  }

  head() {
    return this.segments[this.segments.length - 1];
  }

  eat() {
    if (this.head().equals(this.board.apple.pos)) {
      this.addLength = 2;
      return true;
    } else {
      return false;
    }
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

    if (this.eat()) {
      this.board.apple.create();
    }

    if (this.addLength > 0) {
      this.addLength -= 1;
    } else {
      this.segments.shift();
    }

    if (!this.collides()) {
      this.segments = [];
      alert("YOU DIED!");

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
