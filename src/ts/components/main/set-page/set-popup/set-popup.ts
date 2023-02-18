import Control from '../../../../common/control';
import { state } from '../../../../common/state';
import { StateOptions } from '../../../../common/state-types';
import './popup.scss';

export class SetPopup extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'modal fade');
    this.node.setAttribute('id', 'staticBackdrop');
    this.node.setAttribute('data-bs-backdrop', 'static');
    this.node.setAttribute('data-bs-keyboard', 'false');
    this.node.setAttribute('tabindex', '-1');
    this.node.setAttribute('aria-labelledby', 'staticBackdropLabel');
    this.node.setAttribute('aria-hidden', 'true');

    const modalDialog = new Control(this.node, 'div', 'modal-dialog modal-position');
    const modalContent = new Control(modalDialog.node, 'div', 'modal-content');
    const modalHeader = new Control(modalContent.node, 'div', 'modal-header');
    const modalTitle = new Control(modalHeader.node, 'h1', 'modal-title', 'Внимание!');
    modalTitle.node.setAttribute('id', 'staticBackdropLabel');
    modalTitle.node.style.color = 'black';
    const btnClose = new Control(modalHeader.node, 'button', 'btn-close');
    btnClose.node.setAttribute('type', 'button');
    btnClose.node.setAttribute('data-bs-dismiss', 'modal');
    btnClose.node.setAttribute('aria-label', 'Close');

    const modalMain = new Control(modalContent.node, 'div', 'modal-body');
    modalMain.node.style.color = 'black';

    const modalFooter = new Control(modalContent.node, 'div', 'modal-footer');
    const btn = new Control(modalFooter.node, 'button', 'btn btn-secondary', 'Закрыть');
    btn.node.setAttribute('type', 'button');
    btn.node.setAttribute('data-bs-dismiss', 'modal');

    state.onUpdate.add((type: StateOptions) => {
      switch (type) {
        case StateOptions.changePassword:
          const isValidPassword = state.getPasswordValidate();
          if (isValidPassword) {
            modalMain.node.textContent = 'Вы изменили пароль!';
          } else {
            modalMain.node.textContent = 'Неверный старый пароль или новый пароль меньше 4 символов!';
          }
          break;

        case StateOptions.resetSettings:
          modalMain.node.textContent = 'Вы сбросили настройки, не забудьте сохранить результат!';
          break;

        case StateOptions.saveSettings:
          modalMain.node.textContent = 'Вы сохранили настройки!';
          break;
      }
    });
  }
}
