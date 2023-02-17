import { DataController } from '../../../../api/data-controller';
import Control from '../../../../common/control';
import { state } from '../../../../common/state';
import './change-password.scss';

export class ChangePassword extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'form');

    const title = new Control(this.node, 'h5', 'display-5', 'Смена пароля');
    const oldInputInner = new Control(this.node, 'div', 'form-floating mb-3');
    const oldInput: Control<HTMLInputElement> = new Control(oldInputInner.node, 'input', 'form-control');
    oldInput.node.setAttribute('type', 'password');
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
    newInput.node.setAttribute('type', 'password');
    newInput.node.setAttribute('id', 'floatingInput1');
    newInput.node.setAttribute('placeholder', 'Новый пароль');
    const newLabel: Control<HTMLLabelElement> = new Control(
      newInputInner.node,
      'label',
      'label-password',
      'Новый пароль'
    );
    newLabel.node.setAttribute('for', 'floatingInput1');

    const changeBtn = new Control(this.node, 'button', 'btn btn-primary', 'Сменить пароль');
    changeBtn.node.onclick = () => this.changePassword(newInput.node.value);
  }

  private async changePassword(newPassword: string): Promise<void> {
    state.setPassword(newPassword);
    await DataController.updateUserData();
  }
}
