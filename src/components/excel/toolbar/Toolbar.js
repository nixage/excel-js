import {createToolbar} from './toolbar.template';
import {StoreComponent} from '@core/StoreComponent';
import {isButton} from './toolbar.function'
import {$} from '@core/dom';
import {initialStyle} from '@core/initialStyle'
import * as actions from '@core/redux/actions'
import {storage} from '@core/localStorage/localStorage';

export class Toolbar extends StoreComponent {
  static className = 'excel-toolbar';

  constructor(root, options) {
    super(root, {
      name: 'Toolbar',
      listeners: [
        {
          eventType: 'click',
          field: '',
          fn: 'onClick'
        }
      ],
      subscribe: ['currentStyle'],
      ...options
    })
  }

  prepare() {
    const style = storage('app-state') ? storage('app-state').currentStyle: initialStyle
    this.initialState(style)
  }

  get template() {
    return createToolbar(this.state);
  }

  toHtml() {
    return this.template
  }

  $storeChange(change) {
    this.setState(change.currentStyle)
  }

  onClick(event) {
    if (isButton(event)) {
      const style = $(event.target).data.style;
      const value = $(event.target).data.value;
      this.$storeDispatch(actions.createStyleActions({[style]: value}))
      this.$emit('toolbar:style', {[style]: value})
    }
  }
}
