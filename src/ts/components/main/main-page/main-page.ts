import Control from '../../../common/control';
import { state } from '../../../common/state';
import { MainAuthPage } from './main-auth-page/main-auth-page';
import './main-page.scss';
import { MainUnauthPage } from './main-unauth-page/main-unauth-page';

export class MainPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'main-page');

    if (state.getAuthUser()) {
      new MainAuthPage(this.node);
    } else {
      new MainUnauthPage(this.node);
    }
  }
}
