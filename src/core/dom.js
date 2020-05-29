class Dom {
  constructor(selector) {
    this.el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    this.listeners = [];
  }

  html(html) {
    if (typeof html === 'string') {
      this.el.innerHTML = html;
      return this;
    }
    return this.el.innerHTML;
  }

  append(element) {
    if (element instanceof Dom) {
      element = element.el;
    }
    this.el.append(element);
    return this;
  }

  on(eventType, selector, callback) {
    const rootNode = this.el
    const nodeElements = rootNode.querySelectorAll(selector);
    console.log(this)
    if (nodeElements) {
      for (let i = 0; i < nodeElements.length; i++ ) {
        nodeElements[i].addEventListener(eventType, callback);
        this.listeners.push({
          nodeElement: nodeElements[i],
          fn: callback
        })
      }
    }
  }

  off(eventType, selector, callback) {
    const listener = this.listeners.find((el) => el.fn === callback);
    if (listener) {
      listener.nodeElement.removeEventListener(eventType, callback);
    }
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = function(tagName, classes = '') {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
