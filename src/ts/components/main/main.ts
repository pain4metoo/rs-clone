import Control from '../../common/control';
import { state } from '../../common/state';
import { StateOptions } from '../../common/state-types';
import { AuthPage } from './auth-page/auth-page';
import { CategoriesPage } from './categories-page/categories-page';
import { FavorPage } from './favor-page/favor-page';
import { LessonPage } from './lesson-page/lesson-page';
import { MainPage } from './main-page/main-page';
import { SetPage } from './set-page/set-page';
import { StatistPage } from './statist-page/statist-page';
import { TaskPage } from './task-page/task-page';
import { TestPage } from './test-page/test-page';
import { UnauthPage } from './unauth-page/unauth-page';

export enum PagesList {
  mainPage = 'Главная',
  lessonsPage = 'Уроки',
  lessonPage = 'Урок',
  testsPage = 'Тесты',
  testPage = 'Тест',
  tasksPage = 'Задачи',
  taskPage = 'Блок задач',
  favorPage = 'Избранное',
  statistPage = 'Статистика',
  setPage = 'Настройки',
  authPage = 'Войти',
  unauthPage = 'Зарегистрироваться',
  logout = 'Выйти',
}

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
    if (this.mainInner) {
      this.mainInner.node.remove();
    }

    this.mainInner = new Control(this.node, 'div', 'main_inner');

    const currentPageName: PagesList = state.getCurrentPage().name;

    switch (currentPageName) {
      case PagesList.mainPage:
        new MainPage(this.mainInner.node);
        break;

      case PagesList.lessonsPage:
        new CategoriesPage(this.mainInner.node, 'lessons');
        break;

      case PagesList.lessonPage:
        new LessonPage(this.mainInner.node);
        break;

      case PagesList.testsPage:
        new CategoriesPage(this.mainInner.node, 'tests');
        break;

      case PagesList.testPage:
        new TestPage(this.mainInner.node);
        break;

      case PagesList.tasksPage:
        new CategoriesPage(this.mainInner.node, 'tasks');
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
