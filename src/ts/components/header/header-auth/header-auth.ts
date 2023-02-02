import Control from '../../../common/control';
import './header-auth.scss';

export class HeaderAuth extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header_unauth');

    const navList = new Control(this.node, 'ul', 'nav');
    const listArr = ['Избранное', 'Статистика', 'Настройки', 'Выйти'];

    for (let i = 0; i < listArr.length; i++) {
      const listItem = new Control(navList.node, 'li', 'nav_item');
      const linkItem: { node: HTMLLinkElement } = new Control(listItem.node, 'a', 'nav-link');
      linkItem.node.href = '#';
      linkItem.node.textContent = listArr[i];
    }
  }
}
