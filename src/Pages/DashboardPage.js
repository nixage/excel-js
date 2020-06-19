import {Page} from '@core/Page';
import {Dashboard} from '@/components/dashboard/Dashboard'
import {Home} from '@/components/dashboard/home/Home';


export class DashboardPage extends Page {
  getRoot() {
    this.dashboard = new Dashboard({
      components: [Home]
    });

    return this.dashboard.getRoot()
  }

  onInit() {
    this.dashboard.init()
  }

  destroy() {
    this.dashboard.destroy()
  }
}
