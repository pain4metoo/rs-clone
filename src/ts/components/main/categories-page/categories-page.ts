import { DataController } from '../../../api/data-controller';
import Control from '../../../common/control';
import { state } from '../../../common/state';
import { ArticleMetaData, CategoriesType, LessonData, TaskData, TestData } from '../../../common/state-types';
import { PagesList } from '../main';

export class CategoriesPage extends Control {
  constructor(parentNode: HTMLElement, type: keyof CategoriesType) {
    super(parentNode, 'div', 'container py-5');
    const accordion = new Control(this.node, 'div', 'accordion');
    accordion.node.id = 'accordionExample';
    this.renderCategoriesList(type, accordion.node);
  }

  private renderCategoriesList(type: keyof CategoriesType, parent: HTMLElement): void {
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
        const categoryItem: Control<HTMLLinkElement> = new Control(accordionBody.node, 'a', '', item.name);
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

  private getProgressValue(items: Array<ArticleMetaData>, type: keyof CategoriesType,): number {
    const allItemsCount = items.length;
    const doneItems = state.getUser().done[type];
    let doneItemsCount = 0;
    items.forEach((item) => {
      doneItems.forEach((doneItem) => {
        if (item.id === +doneItem.id) {
          doneItemsCount +=1;
        }
      })
    });
    return doneItemsCount ? Math.round((doneItemsCount / allItemsCount) * 100) : 0; 
  }
}
