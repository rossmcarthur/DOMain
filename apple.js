import Coord from './coord';

class Apple {
  constructor(board) {
    this.board = board;
    this.create();
  }

  create() {
    let x = Math.floor(Math.random() * this.board.size);
    let y = Math.floor(Math.random() * this.board.size);

    while (this.board.snake.occupied([x, y])) {
      x = Math.floor(Math.random() * this.board.size);
      y = Math.floor(Math.random() * this.board.size);
    }
    debugger
    this.pos = new Coord(x, y);
  }

}

export default Apple;
