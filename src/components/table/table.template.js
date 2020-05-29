const letterCode = {
  A: 65,
  Z: 90
};

function renderRowCellLetter() {
  const allLetterNumber = letterCode.Z - letterCode.A;
  const template = [];

  for (let i = 0; i < allLetterNumber; i++) {
    template.push(`<div class="excel-table__cell-letter">${String.fromCharCode(letterCode.A + i)}</div>`)
  }
  return template.join('')
}

function renderRowCell(count) {
  const template = [];
  for (let i = 0; i < count; i++ ) {
    template.push(`
      <div class="excel-table__row">
        <div class="excel-table__cell-num">${i + 1}</div>
        <div class="excel-table__row-cell">
          ${renderCell()}
        </div>
      </div>
    `)
  }
  return template.join('')
}

function renderCell() {
  const cellNumber = letterCode.Z - letterCode.A;
  const template = []
  for (let i = 0; i < cellNumber; i++ ) {
    template.push(`
      <div class="excel-table__cell" contenteditable></div>
    `)
  }
  return template.join('')
}

export function createTable(count = 20) {
  return `
  <div class="excel-table__row">
    <div class="excel-table__start"></div>
    <div class="excel-table__row-letter">
      ${renderRowCellLetter()}
    </div>
  </div>
  ${renderRowCell(count)}
  `
}
