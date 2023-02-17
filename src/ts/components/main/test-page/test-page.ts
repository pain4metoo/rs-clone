import { DataController } from '../../../api/data-controller';
import { UserData } from '../../../api/types';
import Control from '../../../common/control';
import { state } from '../../../common/state';
import { LessonData, TaskData, TestData, TestQuestion } from '../../../common/state-types';
import { PagesList } from '../main';
import './test-page.scss';

export class TestPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container py-5');
    const test = state.getTest();
    const testId = test.id;
    const testName = test.name;
    const testQuestions = test.questions;
    const user = state.getUser();

    const breadcrumbs = new Control(this.node, 'nav', 'breadcrumbs');
    breadcrumbs.node.setAttribute('style', '--bs-breadcrumb-divider: ">";');
    breadcrumbs.node.setAttribute('aria-label', 'breadcrumb');
    const breadcrumbsList = new Control(breadcrumbs.node, 'ol', 'breadcrumb');
    const breadcrumbsItemsNames = ['Главная', 'Тесты', `${testName}`];
    breadcrumbsItemsNames.forEach((e, i) => {
      if (i !== breadcrumbsItemsNames.length - 1) {
        const breadcrumbsItem = new Control(breadcrumbsList.node, 'li', 'breadcrumb-item pe-auto fs-5');
        const breadcrumbsItemLink = new Control(breadcrumbsItem.node, 'a', '', e);
        breadcrumbsItemLink.node.setAttribute('href', '#');
        breadcrumbsItem.node.onclick = (): Promise<void> => this.switchPage(e, testId);
      } else {
        const breadcrumbsItem = new Control(breadcrumbsList.node, 'li', 'breadcrumb-item active fs-5', e);
        breadcrumbsItem.node.setAttribute('aria-current', 'page');
      }
    });
    const headingContainer = new Control(this.node, 'div', 'container d-flex flex-row');
    new Control(headingContainer.node, 'h1', 'fw-bold mb-4', testName);
    if (state.getAuthUser()) {
      if (this.isTestDone(testId, user)) {
        const iconDone = new Control(headingContainer.node, 'i', 'bi bi-check-square-fill');
        iconDone.node.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
      </svg>`;
      }
      const iconMark = new Control(headingContainer.node, 'i');
      const emptyBookMarkImg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
    </svg>`;
      const fillBookMarkImg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
  </svg>`;
      if (this.isTestInFavourites(testId, user)) {
        iconMark.node.classList.add('bi-bookmark-fill');
        iconMark.node.innerHTML = fillBookMarkImg;
      } else {
        iconMark.node.classList.add('bi-bookmark');
        iconMark.node.innerHTML = emptyBookMarkImg;
      }
      iconMark.node.onclick = (): void => {
        iconMark.node.classList.toggle('bi-bookmark');
        iconMark.node.classList.toggle('bi-bookmark-fill');
        if (iconMark.node.classList.contains('bi-bookmark-fill')) {
          iconMark.node.innerHTML = fillBookMarkImg;
          this.addTestToFavourites(testId, user);
        } else {
          iconMark.node.innerHTML = emptyBookMarkImg;
          this.removeTestFromFavourites(testId, user);
        }
      };
    }

    this.renderTestContent(this.node, testQuestions);
    // const content = new Control(this.node, 'div', 'container mb-5');
    // content.node.innerHTML = lessonContent;
    const buttonsTestsTasksContainer = new Control(this.node, 'div', 'd-grid gap-2 col-2 mx-auto mb-5');
    const buttonTask: Control<HTMLButtonElement> = new Control(
      buttonsTestsTasksContainer.node,
      'button',
      'btn btn-primary',
      'Решить задачи'
    );
    buttonTask.node.type = 'button';
    buttonTask.node.onclick = (): void => {
      this.switchPage(PagesList.taskPage, testId);
    };
    const buttonTest: Control<HTMLButtonElement> = new Control(
      buttonsTestsTasksContainer.node,
      'button',
      'btn btn-primary',
      'Повторить теорию'
    );
    buttonTest.node.type = 'button';
    buttonTest.node.onclick = (): void => {
      this.switchPage(PagesList.lessonPage, testId);
    };

    const buttonsPrevNextContainer = new Control(this.node, 'div', 'd-flex justify-content-sm-around mb-5');
    const buttonPrev: Control<HTMLButtonElement> = new Control(
      buttonsPrevNextContainer.node,
      'button',
      'btn btn-secondary',
      'Перейти к предыдущему тесту'
    );
    buttonPrev.node.type = 'button';
    if (testId === 1) {
      buttonPrev.node.classList.add('disabled');
    } else {
      buttonPrev.node.classList.remove('disabled');
      buttonPrev.node.onclick = (): Promise<void> => this.switchPage(PagesList.testPage, testId - 1);
    }

    const buttonNext: Control<HTMLButtonElement> = new Control(
      buttonsPrevNextContainer.node,
      'button',
      'btn btn-secondary',
      'Перейти к следующему тесту'
    );
    buttonNext.node.type = 'button';
    buttonNext.node.onclick = (): void => {
      this.switchPage(PagesList.testPage, testId + 1);
    };
  }

  private renderTestContent(node: HTMLElement, questions: Array<TestQuestion>) {
    const questionsWrapper = new Control(node, 'div', 'container mb-5');
    questions.forEach((e) => {
      const question = new Control(questionsWrapper.node, 'div');
      new Control(question.node, 'b', 'mt-5', `Вопрос №${e.id}:`);
      new Control(question.node, 'p', 'mb-4', e.question);
      e.answers.forEach((el) => {
        const answerWrapper = new Control(question.node, 'div', 'form-check')
        const input: Control<HTMLInputElement> = new Control(answerWrapper.node, 'input', 'form-check-input');
        if (e.rightAnswer.length > 1) {
          input.node.type = 'checkbox';
        } else {
          input.node.type = 'radio';
          input.node.name = `question${e.id}`
        }        
        input.node.id = `question${e.id}-answer${el.id}`;
        const label: Control<HTMLLabelElement> = new Control(answerWrapper.node, 'label', 'form-check-label', el.text);
        label.node.htmlFor = `question${e.id}-answer${el.id}`;
      })
    })    
  }

  private async switchPage(page: string, id: number): Promise<void> {
    let data: LessonData | TestData | TaskData;
    switch (page) {
      case PagesList.mainPage:
        state.setNewPage(PagesList.mainPage);
        break;
      case PagesList.testsPage:
        state.setNewPage(PagesList.testsPage);
        break;
      case PagesList.testPage:
        data = await DataController.getTest(id);
        state.setTest(data);
        state.setNewPage(PagesList.testPage);
        break;
      case PagesList.taskPage:
        data = await DataController.getTask(id);
        state.setTask(data);
        state.setNewPage(PagesList.taskPage);
        break;
      case PagesList.lessonPage:
        data = await DataController.getLesson(id);
        state.setLesson(data);
        state.setNewPage(PagesList.lessonPage);
        break;
    }
  }

  private isTestDone(id: number, user: UserData): boolean {
    const doneTests = user.done.tests;
    const idAllLessonsDone = doneTests.map((e) => e.id);
    const result = idAllLessonsDone.find((idDone) => id === +idDone);
    return result ? true : false;
  }

  private isTestInFavourites(id: number, user: UserData): boolean {
    const userFavoritesTests = user.favourites.tests;
    const userFavoritesTestsId = userFavoritesTests.map((e) => e.id);
    return userFavoritesTestsId.includes(id) ? true : false;
  }

  private addTestToFavourites(id: number, user: UserData): void {
    if (!this.isTestInFavourites(id, user)) {
      user.favourites.lessons.push({ id: Number(`${id}`) });
      state.setUserData(user);
      DataController.updateUserData();
    }
  }

  private removeTestFromFavourites(id: number, user: UserData): void {
    if (this.isTestInFavourites(id, user)) {
      user.favourites.lessons = user.favourites.lessons.filter((e) => e.id !== id);
      state.setUserData(user);
      DataController.updateUserData();
    }
  }

  private addTestToDone(id: number, user: UserData): void {
    const doneLessons = user.done.lessons;
    const idAllLessonsDone = doneLessons.map((e) => e.id);
    if (!idAllLessonsDone.includes(id)) {
      user.done.lessons.push({ id: Number(`${id}`) });
      state.setUserData(user);
      DataController.updateUserData();
    }
  }
}
