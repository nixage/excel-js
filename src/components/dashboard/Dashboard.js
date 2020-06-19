import {$} from '@core/dom';
import {Emmiter} from '@core/Emmiter';

export class Dashboard {
  constructor(options) {
    this.components = options.components || [];
  }
  getRoot() {
    const root = $.create('div', 'dashboard');
    const componentOptions = {
      emmiter: new Emmiter(),
      store: this.store
    }
    this.components = this.components.map(Component => {
      const el = $.create('div', Component.className)
      const component = new Component(el, componentOptions);
      el.html(component.toHtml())
      root.append(el)
      return component
    });
    return root
  }

  init() {
    this.components.forEach(el => {
      el.init()
    });
  }

  destroy() {
    this.components.forEach( el => el.destroy())
  }
}
