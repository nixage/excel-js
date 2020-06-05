const letterCode = {
  A: 65,
  Z: 90
};

function renderCellLetter() {
  const allLetterNumber = letterCode.Z - letterCode.A;
  const template = [];

  for (let i = 0; i < allLetterNumber; i++) {
    template.push(`
    <div class="excel-table__cell-letter excel-table__cell" data-type="col" data-parent="parent" data-col="${i + 1}">
      ${String.fromCharCode(letterCode.A + i)}
      <div class="excel-table__resizer-col" data-resize="col"></div>
    </div>`)
  }
  return template.join('')
}

function renderRowCell(count) {
  const template = [];
  for (let i = 0; i < count; i++ ) {
    template.push(`
      <div class="excel-table__row" data-parent="parent" data-type="row" >
        <div class="excel-table__cell-num">
          ${i + 1} 
          <div class="excel-table__resizer-row" data-resize="row"></div> 
        </div>
        <div class="excel-table__row excel-table__row-100">
          ${renderCell(i)}
        </div>
      </div>
    `)
  }
  return template.join('')
}

function renderCell(row) {
  const cellNumber = letterCode.Z - letterCode.A;
  const template = []
  for (let i = 0; i < cellNumber; i++ ) {
    template.push(`
      <div class="excel-table__cell" contenteditable data-cell="${i + 1}" data-id="${row + 1}:${i + 1}"></div>
    `)
  }
  return template.join('')
}

export function createTable(count = 20) {
  return `
  <div class="excel-table__body" data-body="table-body">
    <div class="excel-table__row">
      <div class="excel-table__cell-num"></div>
      <div class="excel-table__row">
        ${renderCellLetter()}
      </div>
    </div>
    <div class="excel-table__content" data-content="table-content">
      ${renderRowCell(count)}
    </div>
  </div>
  `
}
