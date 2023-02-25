import Control from '../../../../../../common/control';
import { state } from '../../../../../../common/state';
import { StateOptions } from '../../../../../../common/state-types';
import './avatars-paginations.scss';

export class AvatarPagination extends Control {
  private pagItems: Array<HTMLElement> = [];
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'nav', 'pagination_inner');

    const pagination = new Control(this.node, 'ul', 'pagination pagination-lg');
    const pagPrevInner = new Control(pagination.node, 'li', 'page-item');
    const pagPrev: Control<HTMLLinkElement> = new Control(pagPrevInner.node, 'a', 'page-link');
    pagPrev.node.href = '#';
    pagPrev.node.setAttribute('aria-label', 'Previous');
    const pagPrevText = new Control(pagPrev.node, 'span', '', '<');

    const startPage = state.getCurrentAvatarsPage();
    const endPage = startPage + 3;

    pagPrevText.node.setAttribute('aria-hidden', 'true');
    pagPrev.node.onclick = (): void => this.prevPage();

    for (let i = startPage; i < endPage; i++) {
      const pagItem = new Control(pagination.node, 'li', 'page-item');
      const pagItemInner: Control<HTMLLinkElement> = new Control(pagItem.node, 'a', 'page-link', `${i}`);
      this.pagItems.push(pagItemInner.node);
      pagItemInner.node.onclick = (): void => this.setPage(Number(pagItemInner.node.textContent));
    }

    const pagNextInner = new Control(pagination.node, 'li', 'page-item');
    const pagNext: Control<HTMLLinkElement> = new Control(pagNextInner.node, 'a', 'page-link');
    pagNext.node.href = '#';
    pagNext.node.setAttribute('aria-label', 'Previous');
    const pagNextText = new Control(pagNext.node, 'span', '', '>');
    pagNextText.node.setAttribute('aria-hidden', 'true');
    pagNext.node.onclick = (): void => this.nextPage();

    state.onUpdate.add((type: StateOptions) => {
      switch (type) {
        case StateOptions.avatarsPage:
          this.pagItems.forEach((el: HTMLElement, i: number) => {
            if (i === 0) {
              el.textContent = `${state.getCurrentAvatarsPage()}`;
            }
            if (i === 1) {
              el.textContent = `${state.getCurrentAvatarsPage() + 1}`;
            }
            if (i === 2) {
              el.textContent = `${state.getCurrentAvatarsPage() + 2}`;
            }
          });
          break;
      }
    });
  }

  private setPage(page: number): void {
    state.setCurrentAvatarsPage(page);

    this.pagItems.forEach((el: HTMLElement) => {
      if (Number(el.textContent) === state.getCurrentAvatarsPage()) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  private prevPage(): void {
    let currentPage = state.getCurrentAvatarsPage();
    if (currentPage > 1) {
      state.setCurrentAvatarsPage((currentPage -= 1));
    } else {
      state.setCurrentAvatarsPage(1);
    }
  }

  private nextPage(): void {
    let currentPage = state.getCurrentAvatarsPage();
    if (currentPage < state.getMaxAvatarsPages()) {
      state.setCurrentAvatarsPage((currentPage += 1));
    } else {
      state.setCurrentAvatarsPage(state.getMaxAvatarsPages());
    }
  }
}
