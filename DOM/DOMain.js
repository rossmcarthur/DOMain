import DOM_Node_Collection from './dom_node_collection';

const fncs = [];

const $l = arg => {
  let result = [];

  if (typeof arg === "string") {
    return getNodesFromDom(arg);

  } else if (arg instanceof HTMLElement) {
    result = new DOM_Node_Collection([arg]);

  } else if (typeof arg === "function") {
    fncs.push(arg);
  }
  return result;
};

const getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DOM_Node_Collection(nodesArray);
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

export default $l;
