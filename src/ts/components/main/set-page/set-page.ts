import './set-page.scss';

import Control from '../../../common/control';
import { Switcher } from './switcher-el/switcher';
import { setData, SettingsData } from './set-data';
import { SoundEl } from './sound-el/sound-el';
import { state } from '../../../common/state';
import { ChangePassword } from './changePassword/change-password';
import { SetPopup } from './set-popup/set-popup';
import { ChangeName } from './change-name/change-name';

export class SetPage extends Control {
  private popup!: SetPopup;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'set container');
    const setTitle = new Control(this.node, 'h2', 'h2 display-2 text-center', 'Настройки');
    const setInner = new Control(this.node, 'div', 'set_inner container d-flex justify-content-between');
    const innerLeft = new Control(setInner.node, 'div', 'set_left');
    const innerRight = new Control(setInner.node, 'div', 'set_right');

    setData.forEach((el: SettingsData, index: number) => {
      const data = { name: el.name, option: el.option[0] };
      if (index !== setData.length - 1) {
        const switcher = new Switcher(innerLeft.node, data);
      } else {
        const inputSound = new SoundEl(innerRight.node, data);
      }
    });

    const changePassword = new ChangePassword(innerRight.node);
    const changeName = new ChangeName(innerRight.node);

    const btnInner = new Control(this.node, 'div', 'set_btn_inner');
    const btnReset = new Control(btnInner.node, 'button', 'set_btn btn btn-primary', 'сбросить');
    btnReset.node.onclick = () => this.resetSettings();
    btnReset.node.setAttribute('type', 'button');
    btnReset.node.setAttribute('data-bs-toggle', 'modal');
    btnReset.node.setAttribute('data-bs-target', '#staticBackdrop');
    const btnSave = new Control(btnInner.node, 'button', 'set_btn btn btn-primary', 'сохранить');
    btnSave.node.onclick = () => this.saveSettings();
    btnSave.node.setAttribute('type', 'button');
    btnSave.node.setAttribute('data-bs-toggle', 'modal');
    btnSave.node.setAttribute('data-bs-target', '#staticBackdrop');

    this.createPopup();
  }

  private createPopup(): void {
    if (this.popup) {
      this.popup.destroy();
    }
    this.popup = new SetPopup(this.node);
  }

  private resetSettings(): void {
    state.setTheme(false);
    state.setAnimation(false);
    state.setProgress(false);
    state.setSound(true);
    state.setVolume(0.4);
    state.resetSettings();
  }

  private saveSettings(): void {
    state.saveSettings();
  }
}
