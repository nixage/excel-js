import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resize} from './table.resize';
import {TableSelect} from './Table.select'
import {isResize, isSelected, parseId, nextElement} from './table.function';
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel-table';

  constructor(root, emmiter) {
    super(root, {
      name: 'Table',
      listeners: [
        {
          eventType: 'mousedown',
          field: '[data-body="table-body"]',
          fn: 'onMouseDown',
        },
        {
          eventType: 'keydown',
          field: '[data-content="table-content"]',
          fn: 'tableNavigate',
        },
        {
          eventType: 'input',
          field: '[data-content="table-content"]',
          fn: 'onInput',
        },
      ],
      emmiter
    });
    this.rows = 10;
  }

  prepare() {
    this.tableSelect = new TableSelect()
  }

  init() {
    super.init();
    const el = this.root.find('[data-id="1:1"]');
    this.tableSelect.select(el);

    this.$subscribe('formula:input', (text) => {
      this.tableSelect.currentElement.text(text)
    })
    this.$subscribe('formula:selectElement', () => {
      this.tableSelect.currentElement.focus()
    })
  }

  toHtml() {
    return createTable(this.rows);
  }

  onMouseDown(event) {
    if (isResize(event)) {
      resize(event, this.root)
    } else if (isSelected(event)) {
      const el = $(event.target);
      this.$emit('table:select', el.text())
      if (event.shiftKey) {
        this.tableSelect.selectGroup(el)
      } else {
        this.tableSelect.select(el)
      }
    }
  }

  tableNavigate(event) {
    const keys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Enter', 'Tab'];

    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault()
      const key = event.key;
      const currentId = parseId(this.tableSelect.currentElement.data.id);
      const next = this.root.find(nextElement(key, currentId, this.rows));
      this.tableSelect.select(next);
      this.$emit('table:select', next.text())
    }
  }

  onInput(event) {
    this.$emit('table:select', this.tableSelect.currentElement.text())
  }
}
