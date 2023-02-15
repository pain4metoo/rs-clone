import './set-page.scss';

import Control from '../../../common/control';
import { Switcher } from './switcher-el/switcher';
import { setData, SettingsData } from './set-data';
import { SoundEl } from './sound-el/sound-el';
import { state } from '../../../common/state';
import { StateOptions } from '../../../common/state-types';

export class SetPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'set container border');
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

    const btnInner = new Control(this.node, 'div', 'set_btn_inner');
    const btnReset = new Control(btnInner.node, 'button', 'set_btn btn btn-primary', 'сбросить');
    const btnSave = new Control(btnInner.node, 'button', 'set_btn btn btn-primary', 'сохранить');
  }
}
