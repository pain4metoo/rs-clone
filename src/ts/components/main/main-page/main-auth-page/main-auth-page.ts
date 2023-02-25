import Control from '../../../../common/control';
import './main-auth-page.scss';
import { state } from '../../../../common/state';
import { HeaderAuth } from '../../../header/header-auth/header-auth';
import avatar from '../../../../../assets/svg/avatar.svg';
import { MainAvatars } from './main-avatars/main-avatars';

export class MainAuthPage extends Control {
  avatarsPopup!: MainAvatars;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container');

    const currentName = state.getUser().name || '';

    const profile = new Control(this.node, 'div', 'profile container');
    const profileImgContainer = new Control(profile.node, 'div', 'profile_img_container');
    const profileAva: Control<HTMLImageElement> = new Control(profileImgContainer.node, 'img', 'profile_img img-fluid');
    profileAva.node.alt = 'avatar';
    profileAva.node.src = avatar;
    const avaChange = new Control(profileImgContainer.node, 'div', 'profile_ava_change', 'Изменить аватар');

    const profileRight = new Control(profile.node, 'div', 'profile_right container');
    const profileName = new Control(profileRight.node, 'p', 'text-center display-4', `Привет ${currentName}!`);
    new HeaderAuth(profileRight.node);

    avaChange.node.onclick = () => this.selectNewAvatar(profile.node);
  }

  private selectNewAvatar(profileNode: HTMLElement): void {
    if (this.avatarsPopup) {
      this.avatarsPopup.destroy();
    }

    this.avatarsPopup = new MainAvatars(profileNode);
  }
}
