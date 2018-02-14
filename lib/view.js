import Board from "./board.js";
import $l from '../DOM/DOMain.js';

class View {
  constructor($root) {
    this.$root = $root;

    this.board = new Board(20);

    this.interval = window.setInterval(
      this.move.bind(this),
      150
    );

    $l("body").on("keydown", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(e) {
    const movement = View.KEYS[e.keyCode];
    if (movement) {
      this.board.snake.turn(movement);
    }
  }

  render() {
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.pos], "apple");
  }

  updateClasses(coords, _class) {
    this.$li.removeClass(`${_class}`);

    coords.forEach(coord => {
      const flat = (coord.x * this.board.size) + coord.y;
      if (this.$li.eq(flat)) {
      this.$li.eq(flat).addClass(_class);
    }
    });
  }

  setupGrid() {
    let html = "";

    for(let i = 0; i < this.board.size; i++) {
      html += "<ul>";
      for(let j = 0; j < this.board.size; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }
    this.$root.html(html);
    this.$li = this.$root.find("li");
  }

  move() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    }
  }
}

View.KEYS = {
  38: "U",
  39: "R",
  40: "D",
  37: "L"
};

export default View;
