import './style/style.scss';
import {Router} from './core/routing/Router';
import {ExcelPage} from './Pages/ExcelPage';
import {DashboardPage} from './Pages/DashboardPage';

new Router('#app', {
  'excel': ExcelPage,
  'dashboard': DashboardPage,
  '**': DashboardPage
})
