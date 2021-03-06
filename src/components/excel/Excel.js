import {$} from '@core/dom'
import {Emmiter} from '@core/Emmiter';
import {ComponentStoreSubscriber} from '@core/ComponentStoreSubscriber';

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store
    this.subsciber = new ComponentStoreSubscriber(this.store)
  }

  getRoot() {
    const root = $.create('div', 'excel');
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
    this.subsciber.componentSubscribe(this.components)
    this.components.forEach(el => {
      el.init()
    });
  }

  destroy() {
    this.subsciber.unsubscribeFromStore()
    this.components.forEach( el => el.destroy())
  }
}
