import {Router} from './Router'
import {Page} from '../Page'


class ExcelPage extends Page{
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'excel'
    return root
  }
}

class DashboardPage extends Page{
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}

describe('Router test', () => {
  let router
  let root
  beforeEach( () => {
    root = document.createElement('div')
    router = new Router(root, {
      'dashboard': DashboardPage,
      'excel': ExcelPage,
      '**': DashboardPage
    })
  })

  test('router shoud be defined', () => {
    expect(router).toBeDefined()
  })

  test('router show correct page dashboard', () => {
    window.location.hash = 'dashboard'
    router.pageChange()
    expect(root.innerHTML).toBe('<div>dashboard</div>')
  })

  test('router show correct page excel', () => {
    window.location.hash = 'excel'
    router.pageChange()
    expect(root.innerHTML).toBe('<div>excel</div>')
  })

})