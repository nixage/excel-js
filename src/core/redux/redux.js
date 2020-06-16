import * as actionType from './types'

export function reducer(state, action) {
  let field;
  switch (action.type) {
    case actionType.COL_STATE:
      field = state.collStateSize || {}
      field[action.data.id] = action.data.value
      return {...state, collStateSize: field};
    case actionType.ROW_STATE:
      field = state.rowStateSize || {}
      field[action.data.id] = action.data.value
      return {...state, rowStateSize: field};
    case actionType.CELL_STATE:
      field = state.cellState || {}
      field[action.data.id] = action.data.text
      return {...state, cellState: field, currentText: action.data.text}
    case actionType.CURRENT_STYLE:
      field = state.currentStyle || {}
      return {...state, currentStyle: {...field, ...action.data}}
    case actionType.STYLE_STATE:
      field = state.stylesState || {};
      action.data.ids.forEach(id => {
        field[id] = {...field[id], ...action.data.styles}
      });
      return {...state, stylesState: {...field}}
    case actionType.TITLE_STATE:
      return {...state, titlePage: action.data}
    default: return state
  }
}
