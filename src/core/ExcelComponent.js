import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options.listeners)
  }

  toHtml() {
    return ''
  }

  initListener() {
    this.initDomListener()
  }
  removeListener() {
    this.removeDomListener()
  }
}

