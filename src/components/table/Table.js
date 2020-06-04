import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resize} from './table.resize';
import {TableSelect} from './Table.select'
import {isResize, isSelected} from './table.function';
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
          fn: 'resize',
        },
      ],
    });
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
    return createTable(10);
  }

  resize(event) {
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
}
