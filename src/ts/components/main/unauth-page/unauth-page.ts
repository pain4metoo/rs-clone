import Control from '../../../common/control';
import './unauth-page.scss';

export class UnauthPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'unauth');

    this.node.textContent = 'unauth-page';
  }
}
