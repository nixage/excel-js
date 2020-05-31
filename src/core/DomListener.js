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
      const fn = this[el.fn].bind(this)
      this.root.on(el.eventType, el.field, fn)
    })
  }

  removeDomListener() {
    this.listeners.forEach( el => {
      const fn = this[el.fn].bind(this)
      this.root.off(el.eventType, el.field, fn)
    })
  }
}
