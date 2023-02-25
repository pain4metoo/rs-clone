import Control from '../../../../common/control';
import './main-auth-page.scss';
import { state } from '../../../../common/state';
import { HeaderAuth } from '../../../header/header-auth/header-auth';
import avatar from '../../../../../assets/svg/avatar.svg';
import { MainAvatars } from './main-avatars/main-avatars';
import { StateOptions } from '../../../../common/state-types';
import { Spinner } from '../../spinner/spinner';

export class MainAuthPage extends Control {
  avatarsPopup!: MainAvatars;
  spinner!: Spinner;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container');

    const currentName = state.getUser().name || '';

    const profile = new Control(this.node, 'div', 'profile container');

    const profileImgContainer = new Control(profile.node, 'div', 'profile_img_container');
    const profileAva: Control<HTMLImageElement> = new Control(profileImgContainer.node, 'img', 'profile_img img-fluid');
    profileAva.node.alt = 'avatar';
    profileAva.node.src = avatar;
    if (state.getUrlAvatar()) {
      profileAva.node.src = state.getUrlAvatar();
    } else {
      profileAva.node.src = avatar;
    }
    const avaChange = new Control(profileImgContainer.node, 'div', 'profile_ava_change', 'Изменить аватар');

    const profileRight = new Control(profile.node, 'div', 'profile_right container');
    const profileName = new Control(profileRight.node, 'p', 'text-center display-4', `Привет ${currentName}!`);
    new HeaderAuth(profileRight.node);

    avaChange.node.onclick = () => this.selectNewAvatar(profile.node);

    state.onUpdate.add((type: StateOptions) => {
      switch (type) {
        case StateOptions.changeAvatar:
          profileAva.node.src = state.getUrlAvatar();
          break;
        case StateOptions.statusLoader:
          this.createLoader(profile.node);
          break;
      }
    });
  }

  private createLoader(profileNode: HTMLElement): void {
    if (this.spinner) {
      this.spinner.destroy();
    }

    let isLoad = state.getLoaderStatus();

    if (isLoad) {
      this.spinner = new Spinner(profileNode);
    } else {
      this.spinner.destroy();
    }
  }

  private selectNewAvatar(profileNode: HTMLElement): void {
    if (this.avatarsPopup) {
      this.avatarsPopup.destroy();
    }

    this.avatarsPopup = new MainAvatars(profileNode);
  }
}
