import {StoreComponent} from '@core/StoreComponent';
import {createTable} from './table.template';
import {resize} from './table.resize';
import {TableSelect} from './Table.select'
import {isResize, isSelected, parseId, nextElement} from './table.function';
import {$} from '@core/dom';
import * as actions from '@redux/actions'
import * as actionsType from '@redux/types'
import {initialStyle} from '@core/initialStyle'
import {parse} from '@core/functions';

export class Table extends StoreComponent {
  static className = 'excel-table';

  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: [
        {
          eventType: 'mousedown',
          field: '[data-body="table-body"]',
          fn: 'tableResize',
        },
        {
          eventType: 'mousedown',
          field: '[data-content="table-content"]',
          fn: 'tableSelected',
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
      ...options
    });
    this.rows = 10;
  }

  prepare() {
    this.tableSelect = new TableSelect()
  }

  init() {
    super.init();
    this.selectCell(this.root.find('[data-id="1:1"]'))
    this.$subscribe('formula:input', (text) => {
      this.tableSelect.currentElement.attr('data-value', text)
      this.tableSelect.currentElement.text(parse(text))
      this.updateTextInStore(text)
    })
    this.$subscribe('formula:selectElement', () => {
      this.tableSelect.currentElement.focus()
    })
    this.$subscribe('toolbar:style', styles => {
      this.tableSelect.setStyle(styles)
      const ids = this.tableSelect.selectedIds.map( el => {
        return `${el.row}:${el.cell}`
      })
      this.$storeDispatch(actions.createStylesActions({ids, styles}))
    })
  }

  toHtml() {
    return createTable(this.rows, this.store.getState());
  }

  selectCell(node) {
    this.tableSelect.select(node);
    this.$emit('table:select', node)
    const style = node.getStyles(Object.keys(initialStyle));
    this.$storeDispatch(actions.createStyleActions(style))
  }

  tableSelected(event) {
    if (isSelected(event)) {
      const el = $(event.target);
      this.$emit('table:select', el)
      if (event.shiftKey) {
        event.preventDefault()
        this.tableSelect.selectGroup(el)
      } else {
        this.selectCell(el)
      }
    }
  }

  tableResize(event) {
    if (isResize(event)) {
      resize(event, this.root, (data) => {
        if (data.actionsType === actionsType.COL_STATE) {
          this.$storeDispatch(actions.createColActions(data))
        } else {
          this.$storeDispatch(actions.createRowActions(data))
        }
      })
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
      this.$emit('table:select', next)
    }
  }

  updateTextInStore(value) {
    this.$storeDispatch(actions.createCellActions({
      id: this.tableSelect.currentElement.data.id,
      text: value
    }))
  }

  onInput(event) {
    const target = $(event.target)
    this.$emit('table:input', target.text())
    this.updateTextInStore(target.text())
  }
}
