import Control from '../../../common/control';
import { state } from '../../../common/state';
import './header-unauth.scss';

export class HeaderUnauth extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header_unauth');

    const navList = new Control(this.node, 'ul', 'nav');
    const listArr: Array<string> = state.getHeaderPages().unAuthPages;

    listArr.forEach((page: string) => {
      const listItem = new Control(navList.node, 'li', 'nav_item');
      const linkItem: { node: HTMLLinkElement } = new Control(listItem.node, 'a', 'nav-link');
      linkItem.node.onclick = () => this.changeMainPages(page);
      linkItem.node.href = '#';
      linkItem.node.textContent = page;
    });
  }

  changeMainPages(page: string): void {
    state.setNewPage(page);
  }
}
