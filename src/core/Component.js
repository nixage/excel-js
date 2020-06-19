import {DomListener} from './DomListener';

export class Component extends DomListener {
  constructor(root, options = {}) {
    super(root, options.listeners)
    this.prepare()
    this.emmiter = options.emmiter
    this.store = options.store
    this.subscribe = options.subscribe || []
  }

  toHtml() {
    return ''
  }

  prepare() {}

  $emit(eventName, ...args) {
    this.emmiter.emit(eventName, ...args)
  }

  $subscribe(eventName, fn) {
    this.emmiter.subscribe(eventName, fn)
  }

  $storeChange() {}

  $storeDispatch(action) {
    this.store.dispatch(action)
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  init() {
    this.initListener()
  }

  destroy() {
    this.removeDomListener()
    this.emmiter.unsubsctibe()
  }

  initListener() {
    this.initDomListener()
  }
  removeListener() {
    this.removeDomListener()
  }
}

