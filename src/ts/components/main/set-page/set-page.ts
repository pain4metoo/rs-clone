import './set-page.scss';

import Control from '../../../common/control';

export class SetPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'test');

    this.node.textContent = 'set-page';
  }
}
