import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import * as actions from '@core/redux/actions';

export class Header extends ExcelComponent {
  static className = 'excel-header';

  constructor(root, options) {
    super(root, {
      name: 'Header',
      listeners: [
        {
          eventType: 'input',
          field: '.exel-header__input',
          fn: 'input',
        }
      ],
      ...options
    })
  }

  input(event) {
    const target = $(event.target)
    this.$storeDispatch(actions.createTitleActions(target.text()))
  }

  toHtml() {
    const title = this.store.getState().titlePage || 'Новая таблица'
    return `
      <div class="excel-header__row">
        <div class="excel-header__left-block">
          <a href="#" class="header__logo">
            <picture>
              <img src="./img/header/table.png" alt="" />
            </picture>
          </a>
          <input
            type="text"
            value="${title}"
            class="exel-header__input input"
          />
        </div>
        <div class="excel-header__right-block">
          <div class="excel-header__button">
            <button class="btn">
              <span class="material-icons">
                delete_forever
              </span>
            </button>
            <button class="btn">
              <span class="material-icons">
                exit_to_app
              </span>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
