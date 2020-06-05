import {$} from '@core/dom'
import {Emmiter} from '../../core/Emmiter';

export class Excel {
  constructor(selector, options) {
    this.el = $(selector);
    this.components = options.components || []
  }

  getRoot() {
    const root = $.create('div', 'excel');
    const emmiter = new Emmiter()
    this.components = this.components.map(Component => {
      const el = $.create('div', Component.className)
      const component = new Component(el, emmiter);
      el.html(component.toHtml())
      root.append(el)
      return component
    });
    return root
  }

  render() {
    this.el.append(this.getRoot())
    this.components.forEach(el => {
      el.init()
    });
  }
}
