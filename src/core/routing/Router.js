import {$} from '../dom';
import {ActivatedRoute} from './ActivatedRoute';
import {parseRoute} from './routing.functions'

export class Router {
  constructor(selector, routes) {
    this.root = $(selector);
    this.routes = routes;
    this.pageChange = this.pageChange.bind(this);
    this.page = null;
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.pageChange);
    this.pageChange()
  }

  pageChange() {
    if (this.page) {
      this.page.destroy()
    }
    this.root.clear()
    const Component = parseRoute(this.routes)
    const page = new Component(ActivatedRoute.param)
    this.root.append(page.getRoot())

    page.onInit()
  }

  destroy() {
    window.removeEventListener('hashchange', this.pageChange)
  }
}
