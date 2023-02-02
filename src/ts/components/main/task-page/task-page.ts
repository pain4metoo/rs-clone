import './task-page.scss';
import Control from '../../../common/control';

export class TaskPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'task');

    this.node.textContent = 'task-page';
  }
}
