import { DataController } from '../../../../api/data-controller';
import Control from '../../../../common/control';
import { state } from '../../../../common/state';
import { StateOptions } from '../../../../common/state-types';
import './change-password.scss';

export class ChangePassword extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'form');

    new Control(this.node, 'h5', 'display-5', 'Смена пароля');
    const oldInputInner = new Control(this.node, 'div', 'form-floating mb-3');
    const oldInput: Control<HTMLInputElement> = new Control(oldInputInner.node, 'input', 'form-control');
    oldInput.node.type = 'password';
    oldInput.node.autocomplete = 'off';
    oldInput.node.setAttribute('id', 'floatingInput');
    oldInput.node.setAttribute('placeholder', 'Старый пароль');
    const oldLabel: Control<HTMLLabelElement> = new Control(
      oldInputInner.node,
      'label',
      'label-password',
      'Старый пароль'
    );
    oldLabel.node.setAttribute('for', 'floatingInput');
    const newInputInner = new Control(this.node, 'div', 'form-floating mb-3');
    const newInput: Control<HTMLInputElement> = new Control(newInputInner.node, 'input', 'form-control');
    newInput.node.setAttribute('id', 'floatingInput1');
    newInput.node.setAttribute('placeholder', 'Новый пароль');
    newInput.node.type = 'password';
    newInput.node.autocomplete = 'off';
    const newLabel: Control<HTMLLabelElement> = new Control(
      newInputInner.node,
      'label',
      'label-password',
      'Новый пароль'
    );
    newLabel.node.setAttribute('for', 'floatingInput1');

    const changeBtn: Control<HTMLButtonElement> = new Control(this.node, 'button', 'btn btn-primary', 'Сменить пароль');
    changeBtn.node.setAttribute('type', 'button');
    changeBtn.node.setAttribute('data-bs-toggle', 'modal');
    changeBtn.node.setAttribute('data-bs-target', '#staticBackdrop');
    changeBtn.node.addEventListener('click', () => state.playSound());

    changeBtn.node.onclick = (): Promise<void> => this.changePassword(newInput.node.value, oldInput.node.value);

    state.onUpdate.add((type: StateOptions) => {
      switch (type) {
        case StateOptions.changePassword:
          if (state.getPasswordValidate()) {
            oldInput.node.classList.add('is-valid');
            newInput.node.classList.add('is-valid');
            oldInput.node.classList.remove('is-invalid');
            newInput.node.classList.remove('is-invalid');
          } else {
            oldInput.node.classList.add('is-invalid');
            oldInput.node.classList.remove('is-valid');
            newInput.node.classList.add('is-invalid');
            newInput.node.classList.remove('is-valid');
          }
          break;
      }
    });
  }

  private async changePassword(newPassword: string, oldPassword: string): Promise<void> {
    state.setNewPassword(newPassword, oldPassword);
    await DataController.updateUserData();
  }
}
