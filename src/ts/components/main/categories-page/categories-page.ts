import { DataController } from '../../../api/data-controller';
import Control from '../../../common/control';
import { state } from '../../../common/state';
import { CategoriesType } from '../../../common/state-types';
import { PagesList } from '../main';

export class CategoriesPage extends Control {
  constructor(parentNode: HTMLElement, type: keyof CategoriesType) {
    super(parentNode, 'div', 'container py-5');
    const accordion = new Control(this.node, 'div', 'accordion');
    accordion.node.id = 'accordionExample';
    this.renderCategoriesList(type, accordion.node);
  }

  private renderCategoriesList(type: keyof CategoriesType, parent: HTMLElement) {
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
      const accordionCollapse = new Control(accordionItem.node, 'div', 'accordion-collapse collapse');
      accordionCollapse.node.id = `collapse-${index}`;
      accordionCollapse.node.setAttribute('aria-labelledby', `heading-${index}`);
      accordionCollapse.node.setAttribute('data-bs-parent', `#accordionExample`);
      const accordionBody = new Control(accordionCollapse.node, 'div', 'accordion-body d-flex flex-column');
      category.items.forEach((item) => {
        const categoryItem: Control<HTMLLinkElement> = new Control(accordionBody.node, 'a', '', item.name);
        categoryItem.node.href = '#';
        categoryItem.node.onclick = () => this.switchPage(type, item.id);
      });
    });
  }

  private async switchPage(type: keyof CategoriesType, id: number): Promise<void> {
    switch (type) {
      case 'lessons':
        const lesson = await DataController.getLesson(id);
        state.setLesson(lesson);
        state.setNewPage(PagesList.lessonPage);
        break;
      case 'tests':        
        const test = await DataController.getTest(id);
        state.setTest(test);
        state.setNewPage(PagesList.testPage);
        break;
      case 'tasks':
        const task = await DataController.getTask(id);
        state.setTask(task);
        state.setNewPage(PagesList.taskPage);
        break;
      default:
        break;
    }
  }
}
