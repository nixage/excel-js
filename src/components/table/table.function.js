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


export function nextElement(key, {row, cell}, maxRow) {
  switch (key) {
    case 'ArrowDown':
    case 'Enter':
      row = row + 1 >= maxRow ? maxRow: ++row
      break;
    case 'ArrowRight':
    case 'Tab':
      cell = cell + 1 >= 25 ? 25: ++cell
      break;
    case 'ArrowLeft':
      cell = cell - 1 <= 1 ? 1: --cell
      break;
    case 'ArrowUp':
      row = row - 1 <= 1 ? 1: --row
      break;
  }

  return `[data-id="${row}:${cell}"]`
}


