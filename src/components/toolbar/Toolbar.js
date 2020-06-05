import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'excel-toolbar';

  constructor(root, emmiter) {
    super(root, {
      name: 'Toolbar',
      listeners: [
        {
          eventType: 'click',
          field: '.btn',
          fn: 'onClick'
        }
      ],
      emmiter
    })
  }

  toHtml() {
    return `
      <div class="excel-toolbar__row">
        <div class="excel-toolbar__button">
          <button class="btn btn-g">
            <span class="material-icons">format_bold</span>
          </button>
        </div>
        <div class="excel-toolbar__button">
          <button class="btn btn-g">
            <span class="material-icons">format_italic</span>
          </button>
        </div>
        <div class="excel-toolbar__button">
          <button class="btn btn-g">
            <span class="material-icons">format_underlined</span>
          </button>
        </div>
        <div class="excel-toolbar__button">
          <button class="btn btn-g">
            <span class="material-icons">format_align_left</span>
          </button>
        </div>
        <div class="excel-toolbar__button">
          <button class="btn btn-g">
            <span class="material-icons">format_align_center</span>
          </button>
        </div>
        <div class="excel-toolbar__button">
          <button class="btn btn-g">
            <span class="material-icons">format_align_right</span>
          </button>
        </div>
      </div>
    `;
  }

  onClick(event) {
    console.log(event)
  }
}
