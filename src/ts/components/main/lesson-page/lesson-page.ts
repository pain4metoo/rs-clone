import { DataController } from '../../../api/data-controller';
import Control from '../../../common/control';
import { state } from '../../../common/state';
import { LessonData, TaskData, TestData } from '../../../common/state-types';
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
      if (i !== breadcrumbsItemsNames.length - 1) {
        const breadcrumbsItem = new Control(breadcrumbsList.node, 'li', 'breadcrumb-item pe-auto fs-5');
        const breadcrumbsItemLink = new Control(breadcrumbsItem.node, 'a', '', e);
        breadcrumbsItemLink.node.setAttribute('href', '#');
        breadcrumbsItem.node.onclick = (): Promise<void> => this.switchPage(e, lessonId);
      } else {
        const breadcrumbsItem = new Control(breadcrumbsList.node, 'li', 'breadcrumb-item active fs-5', e);
        breadcrumbsItem.node.setAttribute('aria-current', 'page');
      }
    });
    const headingContainer = new Control(this.node, 'div', 'container d-flex flex-row');
    new Control(headingContainer.node, 'h1', 'fw-bold mb-4', lessonName);

    if (this.isLessonDone(lessonId)) {
      console.log('yes');
      const iconDone = new Control(headingContainer.node, 'i', 'bi bi-check-square-fill');
      iconDone.node.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
    </svg>`;
    }
    const iconMark = new Control(headingContainer.node, 'i', 'bi bi-bookmark');
    iconMark.node.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
  </svg>`;
    iconMark.node.onclick = (): void => {
      iconMark.node.classList.remove('bi-bookmark');
      iconMark.node.classList.add('bi-bookmark-fill');
      iconMark.node.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
    </svg>`;
    };
    const content = new Control(this.node, 'div', 'container mb-5');
    content.node.innerHTML = `${lessonContent}`;
    const buttonsTestsTasksContainer = new Control(this.node, 'div', 'd-grid gap-2 col-2 mx-auto mb-5');
    const buttonTest: Control<HTMLButtonElement> = new Control(
      buttonsTestsTasksContainer.node,
      'button',
      'btn btn-primary',
      'Пройти тест'
    );
    buttonTest.node.type = 'button';
    buttonTest.node.onclick = (): Promise<void> => this.switchPage(PagesList.testPage, lessonId);
    const buttonTask: Control<HTMLButtonElement> = new Control(
      buttonsTestsTasksContainer.node,
      'button',
      'btn btn-primary',
      'Решить задачи'
    );
    buttonTask.node.type = 'button';
    buttonTask.node.onclick = (): Promise<void> => this.switchPage(PagesList.taskPage, lessonId);
    const buttonsPrevNextContainer = new Control(this.node, 'div', 'd-flex justify-content-sm-around');
    const buttonPrev: Control<HTMLButtonElement> = new Control(
      buttonsPrevNextContainer.node,
      'button',
      'btn btn-secondary',
      'Перейти к предыдущему уроку'
    );
    buttonPrev.node.type = 'button';
    if (lessonId === 1) {
      buttonPrev.node.classList.add('disabled');
    } else {
      buttonPrev.node.classList.remove('disabled');
      buttonPrev.node.onclick = (): Promise<void> => this.switchPage(PagesList.lessonPage, lessonId - 1);
    }

    const buttonNext: Control<HTMLButtonElement> = new Control(
      buttonsPrevNextContainer.node,
      'button',
      'btn btn-secondary',
      'Перейти к следующему уроку'
    );
    buttonNext.node.type = 'button';
    buttonNext.node.onclick = (): Promise<void> => this.switchPage(PagesList.lessonPage, lessonId + 1);
  }

  private async switchPage(page: string, id: number): Promise<void> {
    let data: LessonData | TestData | TaskData;
    switch (page) {
      case PagesList.mainPage:
        state.setNewPage(PagesList.mainPage);
        break;
      case PagesList.lessonsPage:
        state.setNewPage(PagesList.lessonsPage);
        break;
      case PagesList.testPage:
        data = await DataController.getTest(id);
        state.setTest(data);
        state.setNewPage(PagesList.testPage);
        break;
      case PagesList.lessonPage:
        data = await DataController.getLesson(id);
        state.setLesson(data);
        state.setNewPage(PagesList.lessonPage);
        break;
    }
  }

  private isLessonDone(id: number): boolean {
    const doneLessons = state.getUser().done.lessons;

    const idAllLessonsDone = doneLessons.map((e) => e.id);
    console.log(idAllLessonsDone);
    const result = idAllLessonsDone.find((idDone) => id === +idDone);
    return result ? true : false;
  }
}
