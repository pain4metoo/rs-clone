import './favor-page.scss';

import Control from '../../../common/control';

export class FavorPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'favor');

    this.node.textContent = 'favor-page';
  }
}
