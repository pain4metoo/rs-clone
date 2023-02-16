import Control from '../../../../common/control';
import { state } from '../../../../common/state';
import { StateOptions } from '../../../../common/state-types';
import './switcher.scss';

export interface OptionsTypes {
  name: string;
  option: string;
}

export enum SwitcherOption {
  theme = 'Тема',
  animation = 'Анимация',
  progress = 'Прогресс',
  sound = 'Звук',
}

enum SwitcherValues {
  darkTheme = 'Тёмная',
  lightTheme = 'Светлая',
  animOn = 'Включить',
  animOff = 'Выключить',
  resetFalse = 'Прогресс будет сброшен',
  resetTrue = 'Обнулить прогресс',
}
export class Switcher extends Control {
  constructor(parentNode: HTMLElement, options: OptionsTypes) {
    super(parentNode, 'div', 'form-check form-switch d-flex flex-column');

    const inputName = new Control(this.node, 'p', 'display-6 text-start', options.name);
    const inputInner = new Control(this.node, 'div', 'd-flex');
    const input: Control<HTMLInputElement> = new Control(inputInner.node, 'input', 'form-check-input');
    input.node.type = 'checkbox';
    input.node.setAttribute('id', options.name);
    input.node.onclick = () => this.changeOption(options.name, input.node.checked);
    const label: Control<HTMLLabelElement> = new Control(inputInner.node, 'label', 'form-check-label', options.option);
    label.node.setAttribute('for', options.name);

    state.onUpdate.add((type: StateOptions): void => {
      let currentSettings = state.getSettings();
      switch (type) {
        case StateOptions.changeTheme:
          if (options.name === SwitcherOption.theme) {
            if (currentSettings.theme) {
              label.node.textContent = SwitcherValues.lightTheme;
            } else {
              label.node.textContent = SwitcherValues.darkTheme;
            }
          }
          break;
        case StateOptions.changeAnimation:
          if (options.name === SwitcherOption.animation) {
            if (currentSettings.animation) {
              label.node.textContent = SwitcherValues.animOn;
            } else {
              label.node.textContent = SwitcherValues.animOff;
            }
          }
          break;
        case StateOptions.changeProgress:
          if (options.name === SwitcherOption.progress) {
            if (currentSettings.resetProgress) {
              label.node.textContent = SwitcherValues.resetFalse;
            } else {
              label.node.textContent = SwitcherValues.resetTrue;
            }
          }
          break;
      }
    });
  }

  private async changeOption(option: string, inputState: boolean): Promise<void> {
    switch (option) {
      case SwitcherOption.theme:
        if (inputState) {
          state.setTheme(true);
        } else {
          state.setTheme(false);
        }
        break;
      case SwitcherOption.animation:
        if (inputState) {
          state.setAnimation(true);
        } else {
          state.setAnimation(false);
        }
        break;
      case SwitcherOption.progress:
        if (inputState) {
          state.setProgress(true);
        } else {
          state.setProgress(false);
        }
        break;
    }
  }
}
