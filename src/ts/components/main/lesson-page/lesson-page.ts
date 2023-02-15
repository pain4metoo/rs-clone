import { DataController } from '../../../api/data-controller';
import { UserData } from '../../../api/types';
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
    const lessonContent = lesson.content.join(`\n`);
    const user = state.getUser();

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
    if (state.getAuthUser()) {
      if (this.isLessonDone(lessonId, user)) {
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
      if (this.isLessonInFavourites(lessonId, user)) {
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
          this.addLessonToFavourites(lessonId, user);
        } else {
          iconMark.node.innerHTML = emptyBookMarkImg;
          this.removeLessonFromFavourites(lessonId, user);
        }
      };
    }

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
    const buttonsPrevNextContainer = new Control(this.node, 'div', 'd-flex justify-content-sm-around mb-5');
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

    const commentsForm = new Control(this.node, 'div', 'mb-5');
    const labelComments = new Control(commentsForm.node, 'label', 'form-label mb-3', 'Комментарии');
    labelComments.node.setAttribute('for', 'commentForm');
    const textarea: Control<HTMLInputElement> = new Control(commentsForm.node, 'textarea', 'form-control');
    textarea.node.setAttribute('id', 'commentForm');
    textarea.node.setAttribute('rows', '3');
    textarea.node.setAttribute('placeholder', 'Type your comment here');
    const submitButton = new Control(commentsForm.node, 'button', 'btn btn-success disabled', 'Опубликовать');
    textarea.node.oninput = (): void => submitButton.node.classList.remove('disabled');
    submitButton.node.onclick = async (): Promise<void> => {
      this.addComment(lesson, textarea.node.value, user.name);
      textarea.node.value = '';
      submitButton.node.classList.add('disabled');
    };
    const lessonComments = state.getLesson().comments;
    const commentsPosted = new Control(this.node, 'div', 'container');
    lessonComments.reverse().forEach((comment) => {
      const userComment = new Control(commentsPosted.node, 'div', 'container mb-5');
      const userNameContainer = new Control(userComment.node, 'div', 'd-flex align-items-end mb-3');
      const userIcon = new Control(userNameContainer.node, 'i', 'bi bi-person-square me-2');
      userIcon.node.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
        </svg>`;
      new Control(userNameContainer.node, 'span', 'name fw-semibold', comment.userName);
      new Control(userComment.node, 'div', 'comment-content', comment.content);
    });
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

  private isLessonDone(id: number, user: UserData): boolean {
    const doneLessons = user.done.lessons;
    const idAllLessonsDone = doneLessons.map((e) => e.id);
    const result = idAllLessonsDone.find((idDone) => id === +idDone);
    return result ? true : false;
  }

  private isLessonInFavourites(id: number, user: UserData): boolean {
    const userFavoritesLessons = user.favourites.lessons;
    const userFavoritesLessonsId = userFavoritesLessons.map((e) => e.id);
    return userFavoritesLessonsId.includes(id) ? true : false;
  }

  private addLessonToFavourites(id: number, user: UserData): void {
    if (!this.isLessonInFavourites(id, user)) {
      user.favourites.lessons.push({ id: Number(`${id}`) });
      state.setUserData(user);
      DataController.updateUserData();
    }
  }

  private removeLessonFromFavourites(id: number, user: UserData): void {
    if (this.isLessonInFavourites(id, user)) {
      user.favourites.lessons = user.favourites.lessons.filter((e) => e.id !== id);
      state.setUserData(user);
      DataController.updateUserData();
    }
  }

  private addComment(lesson: LessonData, commentText: string, userName: string): void {
    const commentsPrevious = lesson.comments;
    const commentId = commentsPrevious.length + 1;
    const commentAuthor = userName;
    const commentContent = commentText;
    lesson.comments.push({
      id: commentId,
      userName: commentAuthor,
      content: commentContent,
    });
    state.setLesson(lesson);
    DataController.updateLessonComments();
  }
}
