import './style/style.scss';
import {Excel} from './components/excel/Excel';
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Formula} from './components/formula/Formula';
import {Table} from './components/table/Table';

import {createStore} from '@core/createStore';

import {reducer} from '@redux/redux';
import {initialState} from '@redux/initialState';

import {storage} from '@core/localStorage/localStorage';

import {debounce} from '@core/functions';

const store = createStore(reducer, initialState)

const storeFn = debounce( (state) => {
  storage('app-state', state)
}, 300)

store.subscribe(storeFn)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
