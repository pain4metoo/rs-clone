import Control from '../../../common/control';
import { state } from '../../../common/state';
import './nav-menu.scss';

export class NavBar extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'nav', 'nav');

    const navList = new Control(this.node, 'ul', 'nav');
    const listArr = state.getHeaderPages().mainPages;

    for (let i = 0; i < listArr.length; i++) {
      const listItem = new Control(navList.node, 'li', 'nav_item');
      const linkItem: { node: HTMLLinkElement } = new Control(listItem.node, 'a', 'nav-link');
      linkItem.node.href = '#';
      linkItem.node.textContent = listArr[i];
    }
  }
}
