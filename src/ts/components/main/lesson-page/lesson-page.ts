import Control from '../../../common/control';
import './lesson-page.scss';

export class LessonPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'lessons');

    this.node.textContent = 'lesson-page';
  }
}
