import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resize} from './table.resize';
import {TableSelect} from './Table.select'
import {isResize, isSelected, parseId, nextElement} from './table.function';
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel-table';

  constructor(root) {
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
          field: '[data-body="table-body"]',
          fn: 'tableNavigate',
        },
      ],
    });
    this.rows = 10;
  }

  prepare() {
    this.tableSelect = new TableSelect()
  }

  init() {
    super.init();
    const el = this.root.find('[data-id="1:1"]');
    this.tableSelect.select(el)
  }

  toHtml() {
    return createTable(this.rows);
  }

  onMouseDown(event) {
    if (isResize(event)) {
      resize(event, this.root)
    } else if (isSelected(event)) {
      if (event.shiftKey) {
        const el = $(event.target);
        this.tableSelect.selectGroup(el)
      } else {
        const el = $(event.target);
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
      this.tableSelect.select(next)
    }
  }
}
