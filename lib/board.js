import Snake from './snake';
import Apple from './apple';
class Board {

  constructor(size) {
    this.size = size;
    this.snake = new Snake(this);
    this.apple = new Apple(this);

  }

  blankGrid(size) {
    const grid = [];

    for(let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < dim; j++) {
        row.push(Board.EMPTY);
      }
      grid.push(row);
    }
    return grid;
  }

  render() {
    const grid = Board.blankGrid(this.size);

    this.snake.segments.forEach( seg => {
      grid[seg.x][seg.y] = "X";
    });

    grid[this.apple.pos.x][this.apple.pos.y] = "A";

    const rows = [];
    grid.map( row => {
      return row.join("");
    }).join("\n");
  }

  valid(coords) {
    if (coords.x < this.size && coords.x >= 0 && coords.y < this.size && coords.y >= 0) {
      return true;
    }
    return false;
  }

}

Board.EMPTY = ".";

export default Board;
