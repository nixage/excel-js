import {Page} from '@core/Page';
import {createStore} from '@core/createStore/createStore'
import {initialState} from '@core/redux/initialState'
import {debounce} from '@core/functions'
import {reducer} from '@core/redux/redux'
import {storage} from '@core/localStorage/localStorage'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/excel/header/Header'
import {Toolbar} from '@/components/excel/toolbar/Toolbar'
import {Formula} from '@/components/excel/formula/Formula'
import {Table} from '@/components/excel/table/Table'

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const state = storage(`excel:${params}`)
    const initState = initialState(state)
    const store = createStore(reducer, initState);
    const storeFn = debounce((state) => {
      storage(`excel:${params}`, state);
    }, 300);

    store.subscribe(storeFn);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot()
  }

  onInit() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
