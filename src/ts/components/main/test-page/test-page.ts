import Control from '../../../common/control';
import './test-page.scss';

export class TestPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'test');

    this.node.textContent = 'test-page';
  }
}
