import {$} from '@core/dom'
import {Emmiter} from '../../core/Emmiter';
import {ComponentStoreSubscriber} from '../../core/ComponentStoreSubsciber';

export class Excel {
  constructor(selector, options) {
    this.el = $(selector);
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

  render() {
    this.el.append(this.getRoot());
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
