import Control from '../../../../common/control';
import './sound-el.scss';
import { OptionsTypes } from '../switcher-el/switcher';
import soundOff from '../../../../../assets/image/sound-off.png';
import soundOn from '../../../../../assets/image/sound-on.png';

export class SoundEl extends Control {
  constructor(parentNode: HTMLElement, options: OptionsTypes) {
    super(parentNode, 'div', 'sound');
    const sountTitle = new Control(this.node, 'p', 'text-center display-6', options.name);
    const inputInner = new Control(this.node, 'div', 'd-flex align-items-center');
    const soundImage: Control<HTMLImageElement> = new Control(inputInner.node, 'img', 'sound_img');
    soundImage.node.src = soundOn;
    soundImage.node.alt = 'sound';
    const inputLabel: Control<HTMLLabelElement> = new Control(inputInner.node, 'label', 'form-label');
    inputLabel.node.setAttribute('for', 'sound-range');
    const input: Control<HTMLInputElement> = new Control(inputInner.node, 'input', 'form-range');
    input.node.type = 'range';
    input.node.id = 'sound-range';
  }
}
