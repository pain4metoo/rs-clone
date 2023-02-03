import Control from '../../../common/control';
import { state } from '../../../common/state';
import './header-unauth.scss';

export class HeaderUnauth extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'ul', 'navbar-nav');
    const listArr: Array<string> = state.getHeaderPages().unAuthPages;
    listArr.forEach((page: string) => {
      const listItem = new Control(this.node, 'li', 'nav_item');
      const linkItem: Control<HTMLLinkElement> = new Control(listItem.node, 'a', 'nav-link');
      linkItem.node.onclick = (): void => this.changeMainPages(page);
      linkItem.node.href = '#';
      linkItem.node.textContent = page;
    });
  }

  private changeMainPages(page: string): void {
    state.setNewPage(page);
  }
}
