import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options.listeners)
    this.prepare()
    this.emmiter = options.emmiter
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

  init() {
    this.initListener()
  }

  initListener() {
    this.initDomListener()
  }
  removeListener() {
    this.removeDomListener()
  }
}

