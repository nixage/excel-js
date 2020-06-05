import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel-formula';

  constructor(root, emmiter) {
    super(root, {
      name: 'Formula',
      listeners: [
        {
          eventType: 'input',
          field: '.excel-formula__field',
          fn: 'onInput'
        },
        {
          eventType: 'keydown',
          field: '.excel-formula__field',
          fn: 'keydown'
        }
      ],
      emmiter
    })
  }

  init() {
    super.init()
    this.formula = this.root.find('#formula')

    this.$subscribe('table:select', (text) => {
      this.formula.text(text)
    })
  }

  toHtml() {
    return `
      <div class="excel-formula__text">fx</div>
      <div id="formula" class="excel-formula__field" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    const text = event.target.innerText
    this.$emit('formula:input', text)
  }

  keydown(e) {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      this.$emit('formula:selectElement')
      return
    }
  }
}
