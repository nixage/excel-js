export function isResize(event) {
  return event.target.hasAttribute('data-resize')
}

export function isSelected(event) {
  return event.target.hasAttribute('data-cell')
}

export function parseId(str) {
  return {
    row: +str.split(':')[0],
    cell: +str.split(':')[1]
  }
}

export function createRange(current, target) {
  const arr = [];
  for (let cell = current.cell; current.cell > target.cell ? target.cell <= cell : cell <= target.cell; current.cell > target.cell ? cell-- : cell++ ) {
    for (let row = current.row; current.row > target.row ? target.row <= row : row <= target.row; current.row > target.row ? row-- : row++ ) {
      arr.push(`${row}:${cell}`);
    }
  }
  return arr
}

