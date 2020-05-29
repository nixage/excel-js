import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel-formula';

  constructor(root) {
    super(root, {
      name: 'Formula',
      listeners: [
        {
          eventType: 'input',
          field: '.excel-formula__field',
          fn: 'onInput'
        }
      ]
    })
  }

  toHtml() {
    return `
      <div class="excel-formula__text">fx</div>
      <div class="excel-formula__field" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    console.log('Formula event:', event)
  }
}
