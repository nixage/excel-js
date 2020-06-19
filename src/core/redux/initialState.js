import {initialStyle} from '../initialStyle';

function defaultState() {
  const now = new Date().toLocaleDateString() + ' ' + new Date().toTimeString().split(' ')[0]
  return {
    rowStateSize: {},
    collStateSize: {},
    cellState: {},
    stylesState: {},
    currentText: '',
    currentStyle: initialStyle,
    titlePage: 'New Table',
    date: now
  }
}


export function initialState(state) {
  return state ? state : defaultState()
}
