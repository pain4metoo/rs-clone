import { AuthController } from '../../../api/auth-controller';
import Control from '../../../common/control';
import { state } from '../../../common/state';
import { StateOptions } from '../../../common/state-types';
import { PagesList } from '../main';
import './unauth-page.scss';

export class UnauthPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'form container w-auto p-3');

    const form = new Control(this.node, 'form');

    const emailInner = new Control(form.node, 'div', 'mb-3');
    const emailLabel: Control<HTMLLabelElement> = new Control(emailInner.node, 'label', 'form-label', 'Почта');
    emailLabel.node.setAttribute('for', 'inputEmail');
    const emailInput: Control<HTMLInputElement> = new Control(emailInner.node, 'input', 'form-control');
    emailInner.node.id = 'inputEmail';
    emailInput.node.type = 'email';
    emailInput.node.setAttribute('aria-describedby', 'emailHelp');
    const inputText = new Control(
      emailInner.node,
      'div',
      'form-text text-warning',
      'Мы никогда не будем делиться вашей электронной почтой с кем-либо еще'
    );

    const passInner = new Control(form.node, 'div', 'mb-3');
    const passLabel: Control<HTMLLabelElement> = new Control(passInner.node, 'label', 'form-label', 'Пароль');
    passLabel.node.setAttribute('for', 'InputPassword');
    const passInput: Control<HTMLInputElement> = new Control(passInner.node, 'input', 'form-control');
    passInput.node.id = 'InputPassword';
    passInput.node.type = 'password';
    passInput.node.autocomplete = 'off';

    const nameInner = new Control(form.node, 'div', 'mb-3');
    const nameLabel: Control<HTMLLabelElement> = new Control(nameInner.node, 'label', 'form-label', 'Имя');
    nameLabel.node.setAttribute('for', 'InputName');
    const nameInput: Control<HTMLInputElement> = new Control(nameInner.node, 'input', 'form-control');
    nameInput.node.id = 'InputName';
    nameInput.node.type = 'name';

    const onRegBtn: Control<HTMLButtonElement> = new Control(
      this.node,
      'button',
      'btn btn-primary btn-lg',
      'Зарегистрироваться'
    );
    onRegBtn.node.type = 'button';
    onRegBtn.node.onclick = (): Promise<void> =>
      this.createNewUser(emailInput.node.value, passInput.node.value, nameInput.node.value);

    state.onUpdate.add((type: StateOptions) => {
      switch (type) {
        case StateOptions.validReg:
          if (state.getRegValid()) {
            emailInput.node.classList.add('is-valid');
            passInput.node.classList.add('is-valid');
            emailInput.node.classList.remove('is-invalid');
            passInput.node.classList.remove('is-invalid');
            inputText.node.textContent = 'Мы никогда не будем делиться вашей электронной почтой с кем-либо еще';
            inputText.node.classList.add('text-warning');
            inputText.node.classList.remove('text-danger');
          } else {
            emailInput.node.classList.add('is-invalid');
            emailInput.node.classList.remove('is-valid');
            passInput.node.classList.add('is-invalid');
            passInput.node.classList.remove('is-valid');
            inputText.node.textContent = 'Такой пользователь уже существует!';
            inputText.node.classList.add('text-danger');
            inputText.node.classList.remove('text-warning');
          }
          break;
      }
    });
  }

  private async createNewUser(email: string, password: string, name: string): Promise<void> {
    const user = await AuthController.createNewUser(email, password, name);
    if (user) {
      state.setRegValid(true);
      state.authUser();
      state.setUserData(user);
      state.setNewPage(PagesList.mainPage);
      state.setPassword(password);
    } else {
      state.setRegValid(false);
    }
  }
}
