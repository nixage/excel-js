export class DomListener {
  constructor(root, listeners = []) {
    if (!root) {
      throw new Error('No root')
    }
    this.root = root;
    this.listeners = listeners
  }

  initDomListener() {
    this.listeners.forEach(el => {
      this.root.on(el.eventType, el.field, this[el.fn])
    })
  }

  removeDomListener() {
    this.listeners.forEach( el => {
      this.root.off(el.eventType, el.field, this[el.fn])
    })
  }
}
