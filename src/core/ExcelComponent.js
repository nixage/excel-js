import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options.listeners)
    this.prepare()
  }

  toHtml() {
    return ''
  }

  prepare() {}

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

