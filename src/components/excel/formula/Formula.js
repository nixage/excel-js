import {Component} from '@core/Component';
import {$} from '@core/dom'

export class Formula extends Component {
  static className = 'excel-formula';

  constructor(root, options = {}) {
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
      subscribe: ['currentText'],
      ...options
    })
  }

  init() {
    super.init()
    this.formula = this.root.find('#formula')

    this.$subscribe('table:select', (cell) => {
      this.formula.text(cell.data.value || '')
    })

    this.$subscribe('table:input', (text) => {
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
    const text = $(event.target).text()
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
