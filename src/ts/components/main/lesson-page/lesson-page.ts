import Control from '../../../common/control';
import { state } from '../../../common/state';

import './lesson-page.scss';

export class LessonPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container py-5');
    const lesson = state.getLesson();
    console.log(lesson);
  }
}
