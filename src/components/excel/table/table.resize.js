import {$} from '@core/dom';
import * as actionsType from '@core/redux/types'

export function resize(event, root, cb) {
  const target = $(event.target);
  const parent = target.closest('[data-parent="parent"]');
  const cords = parent.cords();
  const cells = root.all(`[data-cell="${parent.data.cell}"]`);
  const type = parent.data.type;
  const side = type === 'col' ? 'bottom' : 'right';
  let size;
  root.css({'user-select': 'none'})
  target.css({[side]: `-5000px`}).css({'opacity': 1});
  document.onmousemove = (e) => {
    if (type === 'col') {
      const value = e.clientX - cords.right + 1;
      size = cords.width + value;
      target.css({'right': -value + 'px'})
    } else {
      const value = e.clientY - cords.bottom + 1;
      size = cords.height + value;
      target.css({'bottom': -value + 'px'})
    }
  };
  document.onmouseup = (e) => {
    document.onmousemove = null;
    document.onmouseup = null;
    root.css({'user-select': 'auto'})
    target.css({'bottom': 0}).css({'right': 0}).css({'opacity': 0})
    if (type === 'col') {
      size > 0 ? size : size = 30
      parent.css({'width': size + 'px'})
      cells.forEach((el) => (el.style.width = size + 'px'));
      cb({id: parent.data.cell, value: size, actionsType: actionsType.COL_STATE})
      return
    } else {
      size > 0 ? size : size = 25
      parent.css({'height': size + 'px'})
      cb({id: parent.data.row, value: size, actionsType: actionsType.ROW_STATE})
      return
    }
  };
}
