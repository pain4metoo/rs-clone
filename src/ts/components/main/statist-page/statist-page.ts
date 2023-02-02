import './statist-page.scss';

import Control from '../../../common/control';

export class StatistPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'test');

    this.node.textContent = 'statist-page';
  }
}
