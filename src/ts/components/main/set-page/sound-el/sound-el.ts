import Control from '../../../../common/control';
import './sound-el.scss';
import { OptionsTypes, SwitcherOption } from '../switcher-el/switcher';
import soundOff from '../../../../../assets/image/sound-off.png';
import soundOn from '../../../../../assets/image/sound-on.png';
import { state } from '../../../../common/state';
import { StateOptions } from '../../../../common/state-types';

export class SoundEl extends Control {
  oldVolume: string = '40';
  constructor(parentNode: HTMLElement, options: OptionsTypes) {
    super(parentNode, 'div', 'sound');
    const sountTitle = new Control(this.node, 'p', 'text-center display-6', options.name);
    const inputInner = new Control(this.node, 'div', 'd-flex align-items-center');
    const soundImage: Control<HTMLImageElement> = new Control(inputInner.node, 'img', 'sound_img');
    soundImage.node.src = soundOn;
    soundImage.node.alt = 'sound';
    soundImage.node.onclick = (): void => this.changeOption(options.name);
    const inputLabel: Control<HTMLLabelElement> = new Control(inputInner.node, 'label', 'form-label');
    inputLabel.node.setAttribute('for', 'sound-range');
    const input: Control<HTMLInputElement> = new Control(inputInner.node, 'input', 'form-range');
    input.node.type = 'range';
    input.node.id = 'sound-range';
    input.node.onchange = (): void => this.changeVolume(input.node.value);
    state.onUpdate.add((type: StateOptions): void => {
      let currentSet = state.getSettings();
      switch (type) {
        case StateOptions.changeSound:
          if (currentSet.sound) {
            soundImage.node.src = soundOn;
            input.node.value = `${this.oldVolume}`;
          } else {
            soundImage.node.src = soundOff;
            input.node.value = '0';
          }
          break;
        case StateOptions.changeVolume:
          if (currentSet.volume > 0) {
            soundImage.node.src = soundOn;
          } else {
            soundImage.node.src = soundOff;
          }
          break;
      }
    });
  }

  private changeVolume(value: string): void {
    this.oldVolume = value;

    if (+value > 0) {
      state.setSound(true);
      state.setVolume(+value / 100);
    } else {
      state.setSound(false);
      state.setVolume(0);
    }
  }

  private changeOption(option: string): void {
    let currentSet = state.getSettings();
    switch (option) {
      case SwitcherOption.sound:
        if (currentSet.sound) {
          state.setSound(false);
          state.setVolume(0);
        } else {
          state.setSound(true);
          state.setVolume(+this.oldVolume / 100);
        }
        break;
    }
  }
}
