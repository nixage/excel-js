import {Component} from '@core/Component';

export class StoreComponent extends Component {
  constructor(...args) {
    super(...args)
  }

  get template() {
    return '';
  }

  initialState(initialState) {
    this.state = {...initialState}
  }
  setState(newState) {
    this.state = {...this.state, ...newState}
    this.root.html(this.template);
  }
}
