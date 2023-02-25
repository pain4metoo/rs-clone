import { getImages } from '../../../../../api/avatars-api';
import Control from '../../../../../common/control';
import { state } from '../../../../../common/state';
import { StateOptions } from '../../../../../common/state-types';
import { AvatarPagination } from './avatars-pagination/avatars-pagination';
import './main-avatars.scss';

export class MainAvatars extends Control {
  currentAvatars: Array<HTMLImageElement> = [];
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'avatars');
    const closeBtn: Control<HTMLButtonElement> = new Control(this.node, 'button', 'btn-close avatars_btn_close');
    closeBtn.node.type = 'button';
    closeBtn.node.setAttribute('aria-label', 'Close');
    closeBtn.node.onclick = () => this.closeAvatarsMenu();

    const avatarsInner = new Control(this.node, 'div', 'avatars_inner');

    const avatarsLeft = new Control(avatarsInner.node, 'div', 'avatars_left');
    const avatarsItems = new Control(avatarsLeft.node, 'div', 'avatars_items');
    this.getAvatars(avatarsItems.node);
    const avatarsPag = new AvatarPagination(avatarsLeft.node);

    state.onUpdate.add((type: StateOptions) => {
      switch (type) {
        case StateOptions.avatarsPage:
          this.getAvatars(avatarsItems.node);
          break;
      }
    });
  }

  private closeAvatarsMenu(): void {
    this.destroy();
  }

  private async getAvatars(avatarsNode: HTMLElement): Promise<void> {
    state.setLoader(true);
    if (this.currentAvatars.length > 0) {
      this.currentAvatars.forEach((el: HTMLImageElement) => {
        el.remove();
      });
    }
    const avatarsArray = await getImages(state.getCurrentAvatarsPage());
    avatarsArray.forEach((url: string) => {
      const img: Control<HTMLImageElement> = new Control(avatarsNode, 'img', 'avatars_img');
      this.currentAvatars.push(img.node);
      img.node.onclick = () => state.setNewAvatar(url);
      img.node.src = url;
    });
    state.setLoader(false);
  }
}
