import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel-header';

  toHtml() {
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
            value="Новая таблица"
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
