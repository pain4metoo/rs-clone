import Control from '../../../common/control';
import './header-unauth.scss';

export class HeaderUnauth extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header_unauth');

    const navList = new Control(this.node, 'ul', 'nav');
    const listArr = ['Войти', 'Зарегистрироваться'];

    for (let i = 0; i < listArr.length; i++) {
      const listItem = new Control(navList.node, 'li', 'nav-item');
      const linkItem: { node: HTMLLinkElement } = new Control(listItem.node, 'a', 'nav-link');
      linkItem.node.href = '#';
      linkItem.node.textContent = listArr[i];
    }
  }
}
