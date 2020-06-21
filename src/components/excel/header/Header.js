import {Component} from '@core/Component';
import {$} from '@core/dom';
import * as actions from '@core/redux/actions';
import {ActivatedRoute} from '@core/routing/ActivatedRoute';

export class Header extends Component {
  static className = 'excel-header';

  constructor(root, options) {
    super(root, {
      name: 'Header',
      listeners: [
        {
          eventType: 'input',
          field: '.exel-header__input',
          fn: 'input',
        },
        {
          eventType: 'click',
          field: '[data-type="delete"]',
          fn: 'deleteTable',
        },
      ],
      ...options
    })
  }

  input(event) {
    const target = $(event.target)
    this.$storeDispatch(actions.createTitleActions(target.text()))
  }

  deleteTable(event) {
    const question = confirm('Do you really want to delete this table ?')
    if (question) {
      localStorage.removeItem('excel:'+ActivatedRoute.param)
      window.location.hash = '#dashboard'
    }
  }

  toHtml() {
    const title = this.store.getState().titlePage
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
            <button class="btn" data-type="delete">
              <span class="material-icons">
                delete_forever
              </span>
            </button>
            <a class="btn" href="#dashboard">
              <span class="material-icons">
                exit_to_app
              </span>
            </a>
          </div>
        </div>
      </div>
    `;
  }
}
