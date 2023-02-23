import './task-page.scss';
import Control from '../../../common/control';
import { state } from '../../../common/state';
import { LessonData, TaskData, TaskList, TestData } from '../../../common/state-types';
import { PagesList } from '../main';
import { DataController } from '../../../api/data-controller';
import { Places, UserData } from '../../../api/types';

export class TaskPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container py-5');
    window.scrollTo(0, 0);
    const task = state.getTask();
    const taskName = task.name;
    const taskId = task.id;
    const taskList = task.list;
    const taskCategory = task.category;
    const user = state.getUser();
    const firstTaskId = 1;
    const lastTaskId = state
      .getCategories(Places.tasks)
      .map((e) => e.items)
      .reverse()[0]
      .slice(-1)[0].id;

    const breadcrumbs = new Control(this.node, 'nav', 'breadcrumbs');
    breadcrumbs.node.setAttribute('style', '--bs-breadcrumb-divider: ">";');
    breadcrumbs.node.setAttribute('aria-label', 'breadcrumb');
    const breadcrumbsList = new Control(breadcrumbs.node, 'ol', 'breadcrumb');
    const breadcrumbsItemsNames = ['Главная', 'Задачи', `${taskCategory}. ${taskName}`];
    breadcrumbsItemsNames.forEach((e, i) => {
      if (i !== breadcrumbsItemsNames.length - 1) {
        const breadcrumbsItem = new Control(breadcrumbsList.node, 'li', 'breadcrumb-item pe-auto fs-5');
        const breadcrumbsItemLink = new Control(breadcrumbsItem.node, 'a', '', e);
        breadcrumbsItemLink.node.setAttribute('href', '#');
        breadcrumbsItem.node.onclick = (): Promise<void> => this.switchPage(e, taskId);
      } else {
        const breadcrumbsItem = new Control(breadcrumbsList.node, 'li', 'breadcrumb-item active fs-5', e);
        breadcrumbsItem.node.setAttribute('aria-current', 'page');
      }
    });
    const headingContainer = new Control(this.node, 'div', 'container d-flex flex-row');
    new Control(headingContainer.node, 'h1', 'fw-bold mb-4', taskName);
    if (state.getAuthUser()) {
      if (this.areAllTasksCategoryDone(taskId, user, taskList)) {
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
      if (this.isTaskInFavourites(taskId, user)) {
        iconMark.node.classList.add('bi-bookmark-fill');
        iconMark.node.innerHTML = fillBookMarkImg;
        iconMark.node.setAttribute('title', 'Remove from favourites');
      } else {
        iconMark.node.classList.add('bi-bookmark');
        iconMark.node.innerHTML = emptyBookMarkImg;
        iconMark.node.setAttribute('title', 'Add to favourites');
      }
      iconMark.node.onclick = (): void => {
        iconMark.node.classList.toggle('bi-bookmark');
        iconMark.node.classList.toggle('bi-bookmark-fill');
        if (iconMark.node.classList.contains('bi-bookmark-fill')) {
          iconMark.node.innerHTML = fillBookMarkImg;
          iconMark.node.setAttribute('title', 'Remove from favourites');
          this.addTaskToFavourites(taskId, user);
        } else {
          iconMark.node.innerHTML = emptyBookMarkImg;
          iconMark.node.setAttribute('title', 'Add to favourites');
          this.removeTaskFromFavourites(taskId, user);
        }
      };
    }
    const taskContentContainer = new Control(this.node, 'div', 'container mb-5');
    const taskBlock = new Control(taskContentContainer.node, 'div', 'container');
    taskList.forEach((task, i) => {
      const taskRating = task.complexity;
      const maxRating = 3;
      const headingContainer = new Control(taskBlock.node, 'div', 'd-flex align-items-center mb-3');
      new Control(headingContainer.node, 'span', 'me-3 fw-semibold', `Задача ${i + 1}`);
      const starsContainer = new Control(headingContainer.node, 'div', 'd-flex mb-2');
      for (let n = 0; n < maxRating; n += 1) {
        const iconStar = new Control(starsContainer.node, 'i', 'bi bi-star');
        if (n + 1 <= taskRating) {
          iconStar.node.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>`;
        } else {
          iconStar.node.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
        </svg>`;
        }
      }
      const content = new Control(taskBlock.node, 'div', 'container mb-5');
      content.node.innerHTML = task.content;
      const buttonContainerSolution = new Control(taskBlock.node, 'div', 'container mb-5');
      const buttonSolution = new Control(
        buttonContainerSolution.node,
        'button',
        'btn btn-info me-4',
        'Показать/скрыть решение'
      );
      buttonSolution.node.setAttribute('type', 'button');
      buttonSolution.node.setAttribute('data-bs-toggle', 'collapse');
      buttonSolution.node.setAttribute('data-bs-target', `#collapseTaskSolution${i}`);
      buttonSolution.node.setAttribute('aria-expanded', 'false');
      buttonSolution.node.setAttribute('aria-controls', 'collapseExample');
      buttonSolution.node.addEventListener('click', () => state.playSound());
      if (state.getAuthUser()) {
        const buttonMarkedSolved = new Control(
          buttonContainerSolution.node,
          'button',
          'btn btn-warning',
          'Отметить решенной'
        );
        if (this.isCurrentTaskDone(i + 1, user, taskId)) {
          buttonMarkedSolved.node.textContent = 'Решена';
          buttonMarkedSolved.node.classList.add('disabled');
        } else {
          buttonMarkedSolved.node.onclick = (): void => {
            state.playSound();
            this.addCurrentTaskToDone(i + 1, user, taskId);
            buttonMarkedSolved.node.textContent = 'Решена';
            buttonMarkedSolved.node.classList.add('disabled');
          };
        }
      }
      const solutionContainer = new Control(taskBlock.node, 'div', 'collapse');
      solutionContainer.node.setAttribute('id', `collapseTaskSolution${i}`);
      const solutionContent = new Control(solutionContainer.node, 'div', 'card card-body text-dark');
      solutionContent.node.innerHTML = task.solution.join('\n');
    });
    const goToNextLessonButtonWrapper = new Control(this.node, 'div', 'd-flex justify-content-center');
    const goToNextLessonButton = new Control(
      goToNextLessonButtonWrapper.node,
      'button',
      'btn btn-success fs-3 mb-5',
      'Перейти к следующей теме'
    );
    if (taskId === lastTaskId) {
      goToNextLessonButton.node.classList.add('disabled');
    }
    goToNextLessonButton.node.onclick = (): void => {
      this.switchPage(PagesList.lessonPage, taskId + 1);
    };
    const buttonsTestRepeatContainer = new Control(this.node, 'div', 'd-grid gap-2 col-2 mx-auto mb-5');
    const buttonRepeat: Control<HTMLButtonElement> = new Control(
      buttonsTestRepeatContainer.node,
      'button',
      'btn btn-primary',
      'Повторить теорию'
    );
    buttonRepeat.node.type = 'button';
    buttonRepeat.node.onclick = (): void => {
      this.switchPage(PagesList.lessonPage, taskId);
    };
    const buttonTest: Control<HTMLButtonElement> = new Control(
      buttonsTestRepeatContainer.node,
      'button',
      'btn btn-primary',
      'Пройти тест'
    );
    buttonTest.node.type = 'button';
    buttonTest.node.onclick = (): void => {
      this.switchPage(PagesList.testPage, taskId);
    };

    const buttonsPrevNextContainer = new Control(this.node, 'div', 'd-flex justify-content-sm-around mb-5');
    const buttonPrev: Control<HTMLButtonElement> = new Control(
      buttonsPrevNextContainer.node,
      'button',
      'btn btn-secondary',
      'Перейти к предыдущим задачам'
    );
    buttonPrev.node.type = 'button';
    if (taskId === firstTaskId) {
      buttonPrev.node.classList.add('disabled');
    } else {
      buttonPrev.node.classList.remove('disabled');
      buttonPrev.node.onclick = (): Promise<void> => this.switchPage(PagesList.taskPage, taskId - 1);
    }

    const buttonNext: Control<HTMLButtonElement> = new Control(
      buttonsPrevNextContainer.node,
      'button',
      'btn btn-secondary',
      'Перейти к следующим задачам'
    );
    buttonNext.node.type = 'button';
    if (taskId === lastTaskId) {
      buttonNext.node.classList.add('disabled');
    }
    buttonNext.node.onclick = (): void => {
      this.switchPage(PagesList.taskPage, taskId + 1);
    };
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
      case PagesList.tasksPage:
        state.setNewPage(PagesList.tasksPage);
        break;
      case PagesList.testsPage:
        state.setNewPage(PagesList.testsPage);
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
      case PagesList.taskPage:
        data = await DataController.getTask(id);
        state.setTask(data);
        state.setNewPage(PagesList.taskPage);
        break;
    }
  }

  private isThisCategoryIdInDone(id: number, user: UserData): boolean {
    const doneTasks = user.done.tasks;
    const idAllTasksDone = doneTasks.map((e) => Number(e.id));
    const result = idAllTasksDone.includes(id);
    return result ? true : false;
  }

  private isCurrentTaskDone(id: number, user: UserData, idTaskCategory: number): boolean {
    if (this.isThisCategoryIdInDone(idTaskCategory, user)) {
      const doneTasks = user.done.tasks;
      const idAllTasksInCategory = doneTasks.map((e) => e.list)[idTaskCategory - 1];
      const result = idAllTasksInCategory.includes(id);
      return result ? true : false;
    }
    return false;
  }

  private isTaskInFavourites(id: number, user: UserData): boolean {
    const userFavoritesTasks = user.favourites.tasks;
    const userFavoritesTasksId = userFavoritesTasks.map((e) => e.id);
    return userFavoritesTasksId.includes(id) ? true : false;
  }

  private addTaskToFavourites(id: number, user: UserData): void {
    if (!this.isTaskInFavourites(id, user)) {
      user.favourites.tasks.push({ id: Number(`${id}`) });
      state.setUserData(user);
      DataController.updateUserData();
    }
  }

  private removeTaskFromFavourites(id: number, user: UserData): void {
    if (this.isTaskInFavourites(id, user)) {
      user.favourites.tasks = user.favourites.tasks.filter((e) => e.id !== id);
      state.setUserData(user);
      DataController.updateUserData();
    }
  }

  private addCurrentTaskToDone(id: number, user: UserData, idTaskCategory: number): void {
    const allDoneTasks = user.done.tasks;
    if (this.isThisCategoryIdInDone(idTaskCategory, user)) {
      if (!this.isCurrentTaskDone(id, user, idTaskCategory)) {
        const doneTasksInCategory = allDoneTasks.filter((e) => e.id === idTaskCategory)[0].list;
        doneTasksInCategory.push(id);
        user.done.tasks = user.done.tasks.filter((e) => e.id !== idTaskCategory);
        user.done.tasks.push({
          id: idTaskCategory,
          list: doneTasksInCategory,
        });
      } else {
        return;
      }
    } else {
      user.done.tasks.push({
        id: idTaskCategory,
        list: [id],
      });
    }
    user.place = Places.tasks;
    state.setUserData(user);
    DataController.updateUserData();
  }

  private areAllTasksCategoryDone(idTaskCategory: number, user: UserData, taskList: Array<TaskList>): boolean {
    if (this.isThisCategoryIdInDone(idTaskCategory, user)) {
      const lengthTasksDoneInCategoryList = user.done.tasks.filter((e) => e.id === idTaskCategory)[0].list.length;
      const lengthAllTasksInCategoryList = taskList.length;
      return lengthTasksDoneInCategoryList === lengthAllTasksInCategoryList ? true : false;
    } else {
      return false;
    }
  }
}
