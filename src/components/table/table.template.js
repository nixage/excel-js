import {toLineStyle} from '@core/functions'
import {initialStyle} from '@core/initialStyle';
import {parse} from '../../core/functions';

const letterCode = {
  A: 65,
  Z: 90
};

function renderCellLetter(state) {
  const allLetterNumber = letterCode.Z - letterCode.A;
  const template = [];
  const collStateWidth = state.collStateSize;
  for (let i = 0; i < allLetterNumber; i++) {
    template.push(`
    <div 
        class="excel-table__cell-letter excel-table__cell" data-type="col" 
        data-parent="parent" data-cell="${i + 1}"
        style="width: ${collStateWidth[i+1] || 140}px"
        >
      ${String.fromCharCode(letterCode.A + i)}
      <div class="excel-table__resizer-col" data-resize="col"></div>
    </div>`)
  }
  return template.join('')
}

function renderRowCell(count, state) {
  const template = [];
  const collStateWidth = state.collStateSize;
  const rowStateHeight = state.rowStateSize;
  const cellStateText = state.cellState;
  const stylesStateCell = state.stylesState
  for (let i = 0; i < count; i++ ) {
    template.push(`
      <div 
        class="excel-table__row" 
        data-parent="parent" 
        data-type="row" 
        data-row="${i+1}"
        style="height: ${rowStateHeight[i+1] || 30}px"
        >
        <div class="excel-table__cell-num">
          ${i + 1} 
          <div class="excel-table__resizer-row" data-resize="row"></div> 
        </div>
        <div class="excel-table__row excel-table__row-100">
          ${renderCell(i, collStateWidth, cellStateText, stylesStateCell)}
        </div>
      </div>
    `)
  }
  return template.join('')
}

function renderCell(row, collWidth, cellText, stylesCell) {
  const cellNumber = letterCode.Z - letterCode.A;
  const template = [];
  let style;
  for (let i = 0; i < cellNumber; i++ ) {
    const id = `${row + 1}:${i + 1}`
    style = stylesCell[id] ? toLineStyle(stylesCell[id]) : toLineStyle(initialStyle);
    template.push(`
      <div 
        class="excel-table__cell"
        spellcheck="false"
        contenteditable="true" 
        data-cell="${i + 1}" 
        data-id="${id}"
        data-value="${cellText[id] || ''}"
        style="${style}; width:${collWidth[i+1] || 140}px"
        >${parse(cellText[id]) || ''}</div>
    `)
  }
  return template.join('')
}

export function createTable(count = 20, state) {
  return `
  <div class="excel-table__body" data-body="table-body">
    <div class="excel-table__row">
      <div class="excel-table__cell-num"></div>
      <div class="excel-table__row">
        ${renderCellLetter(state)}
      </div>
    </div>
    <div class="excel-table__content" data-content="table-content">
      ${renderRowCell(count, state)}
    </div>
  </div>
  `
}
