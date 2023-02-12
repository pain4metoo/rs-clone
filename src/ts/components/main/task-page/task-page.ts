import './task-page.scss';
import Control from '../../../common/control';
import { state } from '../../../common/state';

export class TaskPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container py-5');

    const task = state.getTask();
  }
}
