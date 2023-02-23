import * as bootstrap from 'bootstrap';
import { DataController } from '../../../api/data-controller';
import { Places, UserData } from '../../../api/types';
import Control from '../../../common/control';
import { state } from '../../../common/state';
import { LessonData, TaskData, TestData, TestQuestion } from '../../../common/state-types';
import { PagesList } from '../main';
import './test-page.scss';

interface UserAnswersForTest {
  questionId: number;
  answersId: Array<number>;
}

export class TestPage extends Control {
  private userAnswersForTest: Array<UserAnswersForTest>;
  private checkButton: Control<HTMLButtonElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container py-5');
    window.scrollTo(0, 0);
    const test = state.getTest();
    const testId = test.id;
    const testName = test.name;
    const testQuestions = test.questions;
    const user = state.getUser();
    this.userAnswersForTest = [];
    const firstTestId = 1;
    const lastTestId = state
      .getCategories(Places.tests)
      .map((e) => e.items)
      .reverse()[0]
      .slice(-1)[0].id;

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
        iconDone.node.setAttribute('title', 'Done');
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
        iconMark.node.setAttribute('title', 'Remove from favourites');
        iconMark.node.innerHTML = fillBookMarkImg;
      } else {
        iconMark.node.classList.add('bi-bookmark');
        iconMark.node.setAttribute('title', 'Add to favourites');
        iconMark.node.innerHTML = emptyBookMarkImg;
      }
      iconMark.node.onclick = (): void => {
        iconMark.node.classList.toggle('bi-bookmark');
        iconMark.node.classList.toggle('bi-bookmark-fill');
        if (iconMark.node.classList.contains('bi-bookmark-fill')) {
          iconMark.node.innerHTML = fillBookMarkImg;
          iconMark.node.setAttribute('title', 'Remove from favourites');
          this.addTestToFavourites(testId, user);
        } else {
          iconMark.node.innerHTML = emptyBookMarkImg;
          iconMark.node.setAttribute('title', 'Add to favourites');
          this.removeTestFromFavourites(testId, user);
        }
      };
    }
    new Control(
      this.node,
      'p',
      'fst-italic ps-2 mb-4',
      'Для прохождения теста нужно ответить правильно минимум на 70% вопросов'
    );

    this.renderTestContent(this.node, testQuestions);
    const checkButtonWrapper = new Control(this.node, 'div', 'd-flex justify-content-center');
    this.checkButton = new Control(
      checkButtonWrapper.node,
      'button',
      'btn btn-success btn-lg fs-3 mb-5',
      'Проверить результат'
    );
    this.checkButton.node.disabled = true;
    this.checkButton.node.onclick = (): void => this.checkTest(testQuestions, testId);

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
    if (testId === firstTestId) {
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
    if (testId === lastTestId) {
      buttonNext.node.classList.add('disabled');
    }
    buttonNext.node.onclick = (): void => {
      this.switchPage(PagesList.testPage, testId + 1);
    };

    const buttonUp = new Control(
      this.node,
      'button',
      'btn btn-outline-info position-fixed bottom-0 end-0 mx-3 my-3',
      '↑'
    );
    buttonUp.node.onclick = (): void => window.scrollTo(0, 0);
  }

  private checkTest(questions: Array<TestQuestion>, id: number): void {
    state.playSound();
    const questionsCount = questions.length;
    let rightAnswersCount = 0;
    this.userAnswersForTest.forEach((e) => {
      const rightAnswer = questions.filter((el) => el.id === e.questionId)[0].rightAnswer.sort((a, b) => a - b);
      const usersAnswer = e.answersId.sort((a, b) => a - b);
      if (rightAnswer.join('') === usersAnswer.join('')) {
        rightAnswersCount += 1;
      }
    });
    const result = (rightAnswersCount / questionsCount) * 100;
    this.renderResultModal(id, result);
  }

  private renderResultModal(id: number, result: number): void {
    const modal = new Control(this.node, 'div', 'modal fade');
    modal.node.setAttribute('data-bs-backdrop', 'static');
    modal.node.setAttribute('data-bs-keyboard', 'false');
    const modalDialog = new Control(modal.node, 'div', 'modal-dialog');
    const modalContent = new Control(modalDialog.node, 'div', 'modal-content');
    const modalHeader = new Control(modalContent.node, 'div', 'modal-header');
    new Control(modalHeader.node, 'h5', 'modal-title text-body', 'Ваш результат');
    const modalCloseButton: Control<HTMLButtonElement> = new Control(modalHeader.node, 'button', 'btn-close');
    modalCloseButton.node.setAttribute('data-bs-dismiss', 'modal');
    modalCloseButton.node.setAttribute('aria-label', 'Закрыть');
    modalCloseButton.node.onclick = (): void => {
      state.playSound();
      modal.destroy();
    };
    const modalBody = new Control(modalContent.node, 'div', 'modal-body');
    const modalText = new Control(modalBody.node, 'p', 'text-center display-3', `${result}%`);
    if (result < 50) {
      modalText.node.classList.add('text-danger');
    } else if (result < 70) {
      modalText.node.classList.add('text-primary');
    } else {
      modalText.node.classList.add('text-success');
      this.addTestToDone(id, result);
    }
    const myModal = new bootstrap.Modal(modal.node);
    myModal.show();
  }

  private renderTestContent(node: HTMLElement, questions: Array<TestQuestion>): void {
    const questionsWrapper = new Control(node, 'div', 'container mb-5');
    questions.forEach((e) => {
      const question = new Control(questionsWrapper.node, 'div');
      new Control(question.node, 'b', 'mt-5', `Вопрос №${e.id}:`);
      const questionText = new Control(question.node, 'p', 'mb-4');
      questionText.node.innerHTML = e.question;
      e.answers.forEach((el) => {
        const answerWrapper = new Control(question.node, 'div', 'form-check');
        const input: Control<HTMLInputElement> = new Control(answerWrapper.node, 'input', 'form-check-input');
        if (e.rightAnswer.length > 1) {
          input.node.type = 'checkbox';
        } else {
          input.node.type = 'radio';
          input.node.name = `question${e.id}`;
        }
        input.node.id = `question${e.id}-answer${el.id}`;
        input.node.onchange = (): void => this.updateUserAnswersForTest(input.node, e.id, el.id, questions);
        const label: Control<HTMLLabelElement> = new Control(answerWrapper.node, 'label', 'form-check-label', el.text);
        label.node.htmlFor = `question${e.id}-answer${el.id}`;
      });
    });
  }

  private updateUserAnswersForTest(
    node: HTMLInputElement,
    questionId: number,
    answerId: number,
    questions: Array<TestQuestion>
  ): void {
    state.playSound();
    let isQuestionExist = false;
    let isAnswerExist = false;
    const currentQuestion = this.userAnswersForTest.filter((e) => e.questionId === questionId);
    if (currentQuestion.length > 0) {
      isQuestionExist = true;
    }
    if (isQuestionExist && currentQuestion[0].answersId.includes(answerId)) {
      isAnswerExist = true;
    }
    if (node.checked) {
      if (!isAnswerExist) {
        if (isQuestionExist) {
          if (node.type === 'checkbox') {
            currentQuestion[0].answersId.push(answerId);
          } else {
            currentQuestion[0].answersId = [answerId];
          }
        } else {
          this.userAnswersForTest.push({
            questionId: questionId,
            answersId: [answerId],
          });
        }
      }
    } else {
      if (isAnswerExist) {
        const index = currentQuestion[0].answersId.indexOf(answerId);
        currentQuestion[0].answersId.splice(index, 1);
      }
    }
    if (this.userAnswersForTest.length === questions.length) {
      this.checkButton.node.removeAttribute('disabled');
    }
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
      user.favourites.tests.push({ id: Number(`${id}`) });
      state.setUserData(user);
      DataController.updateUserData();
    }
  }

  private removeTestFromFavourites(id: number, user: UserData): void {
    if (this.isTestInFavourites(id, user)) {
      user.favourites.tests = user.favourites.tests.filter((e) => e.id !== id);
      state.setUserData(user);
      DataController.updateUserData();
    }
  }

  private addTestToDone(id: number, result: number): void {
    const user = state.getUser();
    const doneTests = user.done.tests;
    const idAllTestsDone = doneTests.map((e) => e.id);
    if (!idAllTestsDone.includes(id)) {
      user.done.tests.push({ id, result });
      user.place = Places.tests;
      state.setUserData(user);
      DataController.updateUserData();
    } else {
      const current = user.done.tests.filter((e) => e.id === id)[0];
      current.result = result;
    }

    console.log(user.done.tests);
  }
}
