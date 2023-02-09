import Control from '../../../common/control';
import { DataController } from '../../../api/data-controller';
import { state } from '../../../common/state';

import './template-inner-page.scss';

export class TemplateInnerPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container');
    const breadcrumbs = new Control(this.node, 'nav', 'breadcrumbs');
    breadcrumbs.node.setAttribute(
      'style',
      '--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="8" height="8"%3E%3Cpath d="M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z" fill="%236c757d" /%3E%3C/svg%3E&#34;);'
    );
    const breadcrumbsList = new Control(breadcrumbs.node, 'ol', 'breadcrumb');
    const breadcrumbItem = new Control(breadcrumbsList.node, 'li', 'breadcrumb-item');
    const currentUserPlace = state.getCurrentUserPlace();
    const currentUserPlaceName = currentUserPlace[0];
    const currentUserPlaceId = currentUserPlace[1];
    }
    
       
    
   /* state.getCategories('lessons').forEach((category, index) => {
      const accordionItem = new Control(accordion.node, 'div', 'accordion-item');
      const accordionHeader = new Control(accordionItem.node, 'h2', 'accordion-header');
      accordionHeader.node.id = `heading-${index}`;
      const accordionButton: Control<HTMLButtonElement> = new Control(
        accordionHeader.node,
        'button',
        'accordion-button fs-2',
        category.name
      );*/
      
      /*Главная

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
    });*/
  }
}
