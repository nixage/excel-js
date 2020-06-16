import * as actionsType from './types'

export function createColActions(data) {
  return {
    type: actionsType.COL_STATE,
    data
  }
}
export function createRowActions(data) {
  return {
    type: actionsType.ROW_STATE,
    data
  }
}
export function createCellActions(data) {
  return {
    type: actionsType.CELL_STATE,
    data
  }
}
export function createStyleActions(data) {
  return {
    type: actionsType.CURRENT_STYLE,
    data
  }
}
export function createStylesActions(data) {
  return {
    type: actionsType.STYLE_STATE,
    data
  }
}
export function createTitleActions(data) {
  return {
    type: actionsType.TITLE_STATE,
    data
  }
}
