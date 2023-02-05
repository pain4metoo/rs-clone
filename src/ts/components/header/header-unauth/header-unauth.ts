import Control from '../../../common/control';
import { state } from '../../../common/state';
import { PagesList } from '../../main/main';

export class HeaderUnauth extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'ul', 'navbar-nav list-group');
    const listArr: Array<PagesList> = state.getHeaderPages().unAuthPages;
    listArr.forEach((page: PagesList) => {
      const listItem = new Control(this.node, 'li', 'list text-center');
      const linkItem: Control<HTMLLinkElement> = new Control(listItem.node, 'a', 'list-group-item list-group-item-action');
      linkItem.node.onclick = (): void => this.changeMainPages(page);
      linkItem.node.href = '#';
      linkItem.node.textContent = page;
    });
  }

  private changeMainPages(page: PagesList): void {
    state.setNewPage(page);
  }
}
