import { DataController } from '../../../api/data-controller';
import { Places } from '../../../api/types';
import Control from '../../../common/control';
import { state } from '../../../common/state';
import {
  ArticleMetaData,
  CategoriesType,
  CategoryContent,
  LessonData,
  TaskData,
  TestData,
} from '../../../common/state-types';
import { PagesList } from '../main';

export class CategoriesPage extends Control {
  constructor(parentNode: HTMLElement, type: Places) {
    super(parentNode, 'div', 'container py-5');
    const accordion = new Control(this.node, 'div', 'accordion');
    accordion.node.id = 'accordionExample';
    this.renderCategoriesList(type, accordion.node);
  }

  private renderCategoriesList(type: Places, parent: HTMLElement): void {
    const isAuth = state.getAuthUser();
    state.getCategories(type).forEach((category, index) => {
      const accordionItem = new Control(parent, 'div', 'accordion-item');
      const accordionHeader = new Control(accordionItem.node, 'h2', 'accordion-header');
      accordionHeader.node.id = `heading-${index}`;
      const accordionButton: Control<HTMLButtonElement> = new Control(
        accordionHeader.node,
        'button',
        'accordion-button fs-2',
        category.name
      );
      accordionButton.node.type = 'button';
      accordionButton.node.setAttribute('data-bs-toggle', 'collapse');
      accordionButton.node.setAttribute('data-bs-target', `#collapse-${index}`);
      accordionButton.node.setAttribute('aria-expanded', 'true');
      accordionButton.node.setAttribute('aria-controls', `collapse-${index}`);
      accordionButton.node.addEventListener('click', () => state.playSound());

      if (isAuth) {
        const progressValue = this.getProgressValue(category.items, type);
        const progress = new Control(accordionHeader.node, 'div', 'progress');
        const progressBar = new Control(
          progress.node,
          'div',
          'progress-bar progress-bar-striped progress-bar-animated',
          `${progressValue}%`
        );
        progressBar.node.setAttribute('role', 'progressbar');
        progressBar.node.setAttribute('style', `width: ${progressValue}%`);
        progressBar.node.setAttribute('aria-valuenow', `${progressValue}`);
        progressBar.node.setAttribute('aria-valuemin', '0');
        progressBar.node.setAttribute('aria-valuemax', '100');
      }

      const accordionCollapse = new Control(accordionItem.node, 'div', 'accordion-collapse collapse');
      accordionCollapse.node.id = `collapse-${index}`;
      accordionCollapse.node.setAttribute('aria-labelledby', `heading-${index}`);
      accordionCollapse.node.setAttribute('data-bs-parent', `#accordionExample`);
      const accordionBody = new Control(accordionCollapse.node, 'div', 'accordion-body d-flex flex-column');
      category.items.forEach((item) => {
        const categoryItem: Control<HTMLLinkElement> = new Control(
          accordionBody.node,
          'a',
          'link-primary d-flex align-items-center',
          item.name
        );
        if (isAuth && this.isItemDone(item, type)) {
          categoryItem.node.classList.add('link-secondary');
          categoryItem.node.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle ms-1" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
        </svg>`;
        }
        categoryItem.node.href = '#';
        categoryItem.node.onclick = (): Promise<void> => this.switchPage(type, item.id);
      });
    });
  }

  private async switchPage(type: keyof CategoriesType, id: number): Promise<void> {
    let data: LessonData | TestData | TaskData;
    switch (type) {
      case 'lessons':
        data = await DataController.getLesson(id);
        state.setLesson(data);
        state.setNewPage(PagesList.lessonPage);
        break;
      case 'tests':
        data = await DataController.getTest(id);
        state.setTest(data);
        state.setNewPage(PagesList.testPage);
        break;
      case 'tasks':
        data = await DataController.getTask(id);
        state.setTask(data);
        state.setNewPage(PagesList.taskPage);
        break;
      default:
        break;
    }
  }

  private getProgressValue(items: Array<ArticleMetaData>, type: keyof CategoriesType): number {
    const allItemsCount = items.length;
    const doneItems = state.getUser().done[type] as Array<ArticleMetaData>;
    let doneItemsCount = 0;
    items.forEach((item) => {
      doneItems.forEach((doneItem) => {
        if (item.id === +doneItem.id) {
          doneItemsCount += 1;
        }
      });
    });
    return doneItemsCount ? Math.round((doneItemsCount / allItemsCount) * 100) : 0;
  }

  private isItemDone(item: ArticleMetaData, type: keyof CategoriesType): boolean {
    const doneItems = state.getUser().done[type] as Array<ArticleMetaData>;
    const result = doneItems.find((doneItem) => item.id === +doneItem.id);
    return result ? true : false;
  }
}
