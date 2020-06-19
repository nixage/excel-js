import {Component} from '@core/Component';
import {createHome} from './home.template';


export class Home extends Component {
  constructor(root, options) {
    super(root, {
      name: 'Home',
      listeners: [],
      ...options
    });
  }

  init() {
    super.init()
  }

  toHtml() {
    return createHome()
  }
}
