import './favor-page.scss';
import Control from '../../../common/control';
import { state } from '../../../common/state';
import { DataController } from '../../../api/data-controller';
import { PagesList } from '../main';
import { CategoriesType, LessonData, TaskData, TestData } from '../../../common/state-types';

export class FavorPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container py-5');
    const favourites = state.getUser().favourites;

    const favouritesListGroup = new Control(this.node, 'ul', 'list-group');
    const favouritesLessons = new Control(favouritesListGroup.node, 'li', 'list-group-item fs-2 py-3', 'Уроки');
    const favouritesTests = new Control(favouritesListGroup.node, 'li', 'list-group-item fs-2 py-3', 'Тесты');
    const favouritesTasks = new Control(favouritesListGroup.node, 'li', 'list-group-item fs-2 py-3', 'Задачи');

    this.renderItems(favouritesLessons.node, favourites.lessons, 'lessons');
    this.renderItems(favouritesTests.node, favourites.tests, 'tests');
    this.renderItems(favouritesTasks.node, favourites.tasks, 'tasks');
  }

  private renderItems(parent: HTMLElement, items: Array<{ id: number }>, type: keyof CategoriesType): void {
    const list = new Control(parent, 'ul', 'list-group list-group-item-light mt-3');
    items.forEach(async (item) => {
      const itemWrapper = new Control(list.node, 'li', 'list-group-item fs-4 d-flex justify-content-between');
      const data = await this.getData(type, item.id);
      if (data) {
        const itemName: Control<HTMLLinkElement> = new Control(itemWrapper.node, 'a', '', data.name);
        itemName.node.href = '#';
        itemName.node.onclick = (): void => this.switchPage(type, data);
      }

      const iconMark = new Control(itemWrapper.node, 'i');
      const fillBookMarkImg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
      </svg>`;
      iconMark.node.classList.add('bi-bookmark-fill');
      iconMark.node.setAttribute('title', 'Remove from favourites');
      iconMark.node.innerHTML = fillBookMarkImg;
      iconMark.node.onclick = (): void => {
        itemWrapper.destroy();
        this.removeItemFromFavourites(type, item.id);
      };
    });
  }

  private async getData(type: keyof CategoriesType, id: number): Promise<LessonData | TestData | TaskData | void> {
    switch (type) {
      case 'lessons':
        return await DataController.getLesson(id);
      case 'tests':
        return await DataController.getTest(id);
      case 'tasks':
        return await DataController.getTask(id);
      default:
        break;
    }
  }

  private switchPage(type: keyof CategoriesType, data: LessonData | TestData | TaskData): void {
    switch (type) {
      case 'lessons':
        state.setLesson(data as LessonData);
        state.setNewPage(PagesList.lessonPage);
        break;
      case 'tests':
        state.setTest(data as TestData);
        state.setNewPage(PagesList.testPage);
        break;
      case 'tasks':
        state.setTask(data as TaskData);
        state.setNewPage(PagesList.taskPage);
        break;
      default:
        break;
    }
  }

  private removeItemFromFavourites(type: keyof CategoriesType, id: number): void {
    const user = state.getUser();
    user.favourites[type] = user.favourites[type].filter((e) => e.id !== id);
    state.setUserData(user);
    DataController.updateUserData();
  }
}
