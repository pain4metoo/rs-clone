import Control from '../../../common/control';
import { state } from '../../../common/state';
import './test-page.scss';

export class TestPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container py-5');

    const test = state.getTest();
    console.log(test);
  }
}
