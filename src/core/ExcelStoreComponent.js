import {ExcelComponent} from './ExcelComponent';

export class ExcelStoreComponent extends ExcelComponent {
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
