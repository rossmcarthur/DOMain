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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__ = __webpack_require__(1);


const fncs = [];

const $l = arg => {
  let result = [];

  if (typeof arg === "string") {
    const nodeList = document.querySelectorAll(arg);
    result = new DOM_Node_Collection(nodeList);

  } else if (arg instanceof HTMLElement) {
    result = new DOM_Node_Collection([arg]);

  } else if (typeof arg === "function") {
    fncs.push(arg);
  }
  return result;
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

window.$l = $l;

let stateCheck = setInterval(() => {
  if (document.readyState === 'complete') {
    fncs.forEach( (func) => {
      func();
    });
    clearInterval(stateCheck);
  }
}, 100);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DOM_Node_Collection {
  constructor(htmlArray) {
    this.htmlArray = htmlArray;
  }

  each(cb) {
    this.htmlArray.forEach(cb);
  }

  html(str) {
    if (str === undefined) {
      return this.htmlArray[0].innerHTML;
    } else {
      this.each(el => {
        el.innerHTML = str;
      });
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
    this.htmlArray.each(el => {
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
    const foundArr = [];
    this.each(el => {
      foundArr.push(...el.querySelectorAll(value));
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

/* unused harmony default export */ var _unused_webpack_default_export = (DOMNodeCollection);


/***/ })
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map