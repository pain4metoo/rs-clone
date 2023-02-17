import { AuthController } from '../../../api/auth-controller';
import Control from '../../../common/control';
import { state } from '../../../common/state';
import { PagesList } from '../main';
import './unauth-page.scss';

export class UnauthPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'form container border border-primary w-auto p-3');

    const form = new Control(this.node, 'form');

    const emailInner = new Control(form.node, 'div', 'mb-3');
    const emailLabel: Control<HTMLLabelElement> = new Control(emailInner.node, 'label', 'form-label', 'Почта');
    emailLabel.node.setAttribute('for', 'inputEmail');
    const emailInput: Control<HTMLInputElement> = new Control(emailInner.node, 'input', 'form-control');
    emailInner.node.id = 'inputEmail';
    emailInput.node.type = 'email';
    emailInput.node.setAttribute('aria-describedby', 'emailHelp');
    new Control(emailInner.node, 'div', 'form-text', "We'll never share your email with anyone else.");

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
  }

  private async createNewUser(email: string, password: string, name: string): Promise<void> {
    const user = await AuthController.createNewUser(email, password, name);
    if (user) {
      state.authUser();
      state.setUserData(user);
      state.setNewPage(PagesList.mainPage);
    }
  }
}
