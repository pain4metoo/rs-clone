import Control from '../../../common/control';
import { state } from '../../../common/state';

import './template-inner-page.scss';

export class TemplateInnerPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container');
    const accordion = new Control(this.node, 'div', 'accordion');
    accordion.node.id = 'accordionExample';
    state.getCategories('lessons').forEach((category, index) => {
      const accordionItem = new Control(accordion.node, 'div', 'accordion-item');
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
      const accordionBody = new Control(accordionCollapse.node, 'div', 'accordion-body');
      category.items.forEach((item) => {
        new Control(accordionBody.node, 'p', '', item.name);
      });
    });
  }
}
