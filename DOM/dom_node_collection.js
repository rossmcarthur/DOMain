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

export default DOM_Node_Collection;
