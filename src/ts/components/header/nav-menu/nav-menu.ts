import Control from '../../../common/control';
import { state } from '../../../common/state';
import { PagesList } from '../../main/main';

export class NavBar extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'ul', 'navbar-nav');
    const listArr: Array<PagesList> = state.getHeaderPages().mainPages;
    listArr.forEach((page: PagesList) => {
      const listItem = new Control(this.node, 'li', 'nav_item');
      const linkItem: Control<HTMLLinkElement> = new Control(listItem.node, 'a', 'nav-link');
      linkItem.node.onclick = (): void => this.changeMainPages(page);
      linkItem.node.href = '#';
      linkItem.node.textContent = page;
    });
  }

  private changeMainPages(page: PagesList): void {
    state.setNewPage(page);
  }
}
