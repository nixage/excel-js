import {storage} from '@core/localStorage/localStorage';
import {initialStyle} from '../initialStyle';

const defaultState = {
  rowStateSize: {},
  collStateSize: {},
  cellState: {},
  stylesState: {},
  currentText: '',
  currentStyle: initialStyle
}

export const initialState = storage('app-state') ? storage('app-state') : defaultState;
