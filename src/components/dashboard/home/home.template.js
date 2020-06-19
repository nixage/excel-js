export function createHome() {
  const id = Date.now().toString();
  const lists = loadAllTable()
  return `
    <header class="dashboard-header">
      <div class="dashboard-header__container container">
        <a href="#" class="dashboard-header__logo">
          <picture>
            <img src="./img/header/table.png" alt="" />
          </picture>
          Tables
        </a>
        <h1 class="dashboard-header__title">EXEL DASHBOARD</h1>
      </div>
    </header>
    <div class="dashboard-new-table">
      <div class="dashboard-new-table__container container">
        <div class="dashboard-new-table__title">Create table</div>
        <div class="dashboard-new-table__add">
          <div class="dashboard-add">
            <div class="dashboard-add__table">
              <a href="#excel/${id}" class="dashboard-add__body">
                <span class="dashboard-add__decor"></span>
                <span class="dashboard-add__decor"></span>
                <span class="dashboard-add__decor"></span>
                <span class="dashboard-add__decor"></span>
              </a>
            </div>
            <div class="dashboard-add__text">New Table</div>
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard-table__list table-lists">
      <div class="dashboard-table__container container">
          ${createTableLists(lists)}
      </div>
    </div>
  `
}

function loadAllTable() {
  const arrKey = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.includes('excel:')) {
      arrKey.push(key)
    }
  }
  return arrKey
}

function createTableLists(lists = []) {
  lists = lists.sort()
  if (!lists.length) {
    return ` 
      <p class="table-lists__link">Table lists is null</p>
    `
  }
  return `
    <div class="table-lists__top">
      <div class="table-lists__name">Назва</div>
      <div class="table-lists__date">Дата открытия</div>
    </div>
    <ul class="table-lists__list">
      ${renderTableList(lists)}
    </ul>
  `
}

function renderTableList(lists) {
  const template = []
  lists.forEach( el => {
    const table = JSON.parse(localStorage.getItem(el));
    template.push(`
      <li>
        <a href="#excel/${el.split(':')[1]}" class="table-lists__link">${table.titlePage}</a>
        <span>${table.date}</span>
      </li>
    `)
  })
  return template.join('')
}
