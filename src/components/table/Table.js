import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resize} from './table.resize';

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

  toHtml() {
    return createTable(10);
  }

  resize(event) {
    if (event.target.hasAttribute('data-resize')) {
      resize(event, this.root)
    }
  }
}
