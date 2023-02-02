import Control from '../../../common/control';
import './auth-page.scss';

export class AuthPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'auth');

    this.node.textContent = 'auth-page';
  }
}
