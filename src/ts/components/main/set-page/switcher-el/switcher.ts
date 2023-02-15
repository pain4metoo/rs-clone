import Control from '../../../../common/control';
import { SettingsData } from '../set-data';

export interface OptionsTypes {
  name: string;
  option: string;
}
export class Switcher extends Control {
  constructor(parentNode: HTMLElement, options: OptionsTypes) {
    super(parentNode, 'div', 'form-check form-switch d-flex flex-column');

    const inputName = new Control(this.node, 'p', 'display-6 text-start', options.name);
    const inputInner = new Control(this.node, 'div', 'd-flex');

    const input: Control<HTMLInputElement> = new Control(inputInner.node, 'input', 'form-check-input');
    input.node.type = 'checkbox';
    input.node.setAttribute('id', 'formSwitchCheckDefault');
    const inputOption = new Control(inputInner.node, 'p', '', options.option);
    const label: Control<HTMLLabelElement> = new Control(inputInner.node, 'label', 'form-check-label');
    label.node.setAttribute('for', 'formSwitchCheckDefault');
  }
}
