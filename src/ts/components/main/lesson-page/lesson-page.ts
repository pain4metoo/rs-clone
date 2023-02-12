import { DataController } from '../../../api/data-controller';
import Control from '../../../common/control';
import { state } from '../../../common/state';
import { LessonData, TaskData, TestData } from '../../../interfaces/state-types';
import { PagesList } from '../main';

import './lesson-page.scss';

export class LessonPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container py-5');
    const lesson = state.getLesson();
    const lessonId = lesson.id;
    const lessonName = lesson.name;
    const lessonContent = lesson.content;

    const breadcrumbs = new Control(this.node, 'nav', 'breadcrumbs');
    breadcrumbs.node.setAttribute('style', '--bs-breadcrumb-divider: ">";');
    breadcrumbs.node.setAttribute('aria-label', 'breadcrumb');
    const breadcrumbsList = new Control(breadcrumbs.node, 'ol', 'breadcrumb');
    const breadcrumbsItemsNames = ['Главная', 'Уроки', `${lessonName}`];
    breadcrumbsItemsNames.forEach((e, i) => {
      const breadcrumbsItem = new Control(breadcrumbsList.node, 'li', 'breadcrumb-item');
      breadcrumbsItem.node.textContent = e;
      const breadcrumbsItemLink = new Control(breadcrumbsItem.node, 'a');
      breadcrumbsItemLink.node.setAttribute('href', '#');
      if (i !== breadcrumbsItemsNames.length - 1) {
        breadcrumbsItemLink.node.onclick = (): Promise<void> => this.switchPage(e, lessonId);
      } else {
        breadcrumbsItemLink.node.classList.add('active');
      }
    });
    const headingContainer = new Control(this.node, 'div', 'container');
    new Control(headingContainer.node, 'h1', '', lessonName);

    if (this.isLessonDone(lessonId)) {
      new Control(headingContainer.node, 'i', 'bi bi-check-square-fill');
    }
    const iconMark = new Control(headingContainer.node, 'i', 'bi bi-bookmark');
    iconMark.node.onclick = (): void => {
      iconMark.node.classList.remove('bi-bookmark');
      iconMark.node.classList.add('bi-bookmark-fill');
    };
    new Control(this.node, 'p', `${lessonContent}`);
    const buttonsTestsTasksContainer = new Control(this.node, 'div', 'container');
    const buttonTest: Control<HTMLButtonElement> = new Control(
      buttonsTestsTasksContainer.node,
      'button',
      'btn btn-primary',
      'Пройти тест'
    );
    buttonTest.node.type = 'button';
    buttonTest.node.onclick = (): Promise<void> => this.switchPage('Тест', lessonId);
  }

  private async switchPage(page: string, id: number): Promise<void> {
    let data: LessonData | TestData | TaskData;
    switch (page) {
      case 'Главная':
        state.setNewPage(PagesList.mainPage);
        break;
      case 'Уроки':
        state.setNewPage(PagesList.lessonsPage);
        break;
      case 'Тест':
        data = await DataController.getTest(id);
        state.setTest(data);
        state.setNewPage(PagesList.testPage);
        break;
    }
  }

  private isLessonDone(id: number): boolean {
    const doneLessons = state.getUser().done.lessons;

    const idAllLessonsDone = doneLessons.map((e) => {
      e.id;
    });
    const result = idAllLessonsDone.find((idDone) => id === +idDone);
    return result ? true : false;
  }
}
