import Control from '../../common/control';
import { PagesList, state, StateOptions } from '../../common/state';
import { AuthPage } from './auth-page/auth-page';
import { FavorPage } from './favor-page/favor-page';
import { LessonPage } from './lesson-page/lesson-page';
import { MainPage } from './main-page/main-page';
import { SetPage } from './set-page/set-page';
import { StatistPage } from './statist-page/statist-page';
import { TaskPage } from './task-page/task-page';
import { TestPage } from './test-page/test-page';
import { UnauthPage } from './unauth-page/unauth-page';

export class Main extends Control {
  private mainInner!: { node: HTMLElement };
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', 'main');

    this.createNewPage();

    state.onUpdate.add((type: StateOptions): void => {
      if (type === StateOptions.changePage) {
        this.createNewPage();
      }
    });
  }

  private createNewPage(): void {
    if (!!this.mainInner) {
      this.mainInner.node.remove();
    }

    this.mainInner = new Control(this.node, 'div', 'main_inner');

    let currentPage: string = state.getHeaderPages().currentPage;

    switch (currentPage) {
      case PagesList.mainPage:
        new MainPage(this.mainInner.node);
        break;

      case PagesList.lessonPage:
        new LessonPage(this.mainInner.node);
        break;

      case PagesList.testPage:
        new TestPage(this.mainInner.node);
        break;

      case PagesList.taskPage:
        new TaskPage(this.mainInner.node);
        break;

      case PagesList.authPage:
        new AuthPage(this.mainInner.node);
        break;

      case PagesList.unauthPage:
        new UnauthPage(this.mainInner.node);
        break;

      case PagesList.favorPage:
        new FavorPage(this.mainInner.node);
        break;

      case PagesList.statistPage:
        new StatistPage(this.mainInner.node);
        break;

      case PagesList.setPage:
        new SetPage(this.mainInner.node);
        break;

      default:
        new MainPage(this.mainInner.node);
    }
  }
}
