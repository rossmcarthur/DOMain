/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Coord {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }

  plus(coord2) {
    return  new Coord(this.x + coord2.x, this.y + coord2.y);
  }

  equals(coord2) {
    return (this.x === coord2.x) && (this.y === coord2.y);
  }

  isOpposite(coord2) {
    return ((-(this.x) == (coord2.x)) && (-(this.y) == (coord2.y)));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Coord);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__ = __webpack_require__(7);


const fncs = [];

const $l = arg => {
  let result = [];

  if (typeof arg === "string") {
    return getNodesFromDom(arg);

  } else if (arg instanceof HTMLElement) {
    result = new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__["a" /* default */]([arg]);

  } else if (typeof arg === "function") {
    fncs.push(arg);
  }
  return result;
};

const getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__["a" /* default */](nodesArray);
};

$l.ajax = options => {
  const defaults = {
    success: () => alert("success"),
    error: () => alert("error"),
    url: window.location.href,
    method: "GET",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  const ajaxInputs = $l.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(ajaxInputs.method, ajaxInputs.url);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      ajaxInputs.success(JSON.parse(xhr.response));
    } else if (xhr.status === 402) {
      ajaxInputs.error();
    }
  };

  xhr.send(ajaxInputs);

};

$l.extend = function (...args) {
  return Object.assign(...args);
};


let stateCheck = setInterval(() => {
  if (document.readyState === 'complete') {
    fncs.forEach( (func) => {
      func();
    });
    clearInterval(stateCheck);
  }
}, 100);

/* harmony default export */ __webpack_exports__["a"] = ($l);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__view__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DOM_DOMain_js__ = __webpack_require__(1);



Object(__WEBPACK_IMPORTED_MODULE_1__DOM_DOMain_js__["a" /* default */])(()=> {
  const rootEl = $('.game');
  const game = new __WEBPACK_IMPORTED_MODULE_0__view__["a" /* default */](rootEl);
  game.setupGrid();
});

window.$l = __WEBPACK_IMPORTED_MODULE_1__DOM_DOMain_js__["a" /* default */];


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DOM_DOMain_js__ = __webpack_require__(1);



class View {
  constructor($root) {
    this.$root = $root;

    this.board = new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* default */](20);

    this.interval = window.setInterval(
      this.move.bind(this),
      200
    );

    Object(__WEBPACK_IMPORTED_MODULE_1__DOM_DOMain_js__["a" /* default */])("body").on("keydown", this.handleKeyEvent.bind(this));
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

/* harmony default export */ __webpack_exports__["a"] = (View);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__snake__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apple__ = __webpack_require__(6);


class Board {

  constructor(size) {
    this.size = size;
    this.snake = new __WEBPACK_IMPORTED_MODULE_0__snake__["a" /* default */](this);
    this.apple = new __WEBPACK_IMPORTED_MODULE_1__apple__["a" /* default */](this);

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

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coord__ = __webpack_require__(0);


class Snake {
  constructor(board) {
    this.direction = "D";
    this.board = board;
    const cent = new __WEBPACK_IMPORTED_MODULE_0__coord__["a" /* default */](10, 10);
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
  "U": new __WEBPACK_IMPORTED_MODULE_0__coord__["a" /* default */](-1, 0),
  "R": new __WEBPACK_IMPORTED_MODULE_0__coord__["a" /* default */](0, 1),
  "D": new __WEBPACK_IMPORTED_MODULE_0__coord__["a" /* default */](1, 0),
  "L": new __WEBPACK_IMPORTED_MODULE_0__coord__["a" /* default */](0, -1)
};

/* harmony default export */ __webpack_exports__["a"] = (Snake);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coord__ = __webpack_require__(0);


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
    this.pos = new __WEBPACK_IMPORTED_MODULE_0__coord__["a" /* default */](x, y);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Apple);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DOM_Node_Collection {
  constructor(htmlArray) {
    this.htmlArray = htmlArray;
  }

  each(cb) {
    this.htmlArray.forEach(cb);
  }

  html(html) {
    if (typeof html === "string") {
      this.each((node) => {
        node.innerHTML = html;
      });
    } else if (this.htmlArray.length > 0) {
      return this.htmlArray[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  append(arg) {
    this.each(el => {
      if (typeof arg === 'string'){
        el.innerHTML += arg;
      } else if (arg instanceof HTMLElement) {
        el.innerHTML += arg.outerHTML;
      } else {
        arg.each(argEl => {
          el.appendChild(argEl);
        });
      }
    });
  }

  attr(name, value) {
    if (value === undefined) {
      return this.htmlArray[0].getAttribute(name);
    } else {
      this.each(el => {
        el.setAttribute(name, value);
      });
      return this;
    }
  }

  hasClass(value) {
    this.htmlArray[0].classList.contains(value);
  }

  addClass(value) {
    this.each(el => {
        el.classList.add(value);
    });
    return this;
  }

  removeClass(value) {
    this.each(el => {
        el.classList.remove(value);
    });
    return this;
  }

  children() {
    let childrenArr = [];
    this.each(el => {
      childrenArr.push(...el.children);
    });
    return new DOM_Node_Collection(childrenArr);
  }

  parent() {
    const parentArr = [];
    this.each((el) => {
      if (!parentArr.includes(el.parentElement)) {
        parentArr.push(el.parentElement);
      }
    });
    return new DOM_Node_Collection(parentArr);
  }

  find(value) {
    let foundArr = [];
    this.each(el => {
      const nodeList = el.querySelectorAll(value);
      foundArr = foundArr.concat(Array.from(nodeList));
    });
    return new DOM_Node_Collection(foundArr);
  }

  remove() {
    this.each(el =>  {
      el.parentNode.removeChild(el);
    });
    return this;
  }

  on(action, callback) {
    this.each(el => {
      el.addEventListener(action, callback);
      el.action = callback;
    });
    return this;
  }

  off(action) {
    this.each(el => {
      el.removeEventListener(action, el.action);
    });
    return this;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DOM_Node_Collection);


/***/ })
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map