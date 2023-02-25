import { AuthController } from '../../../api/auth-controller';
import { DataController } from '../../../api/data-controller';
import { Places, UserData } from '../../../api/types';
import Control from '../../../common/control';
import { state } from '../../../common/state';
import { LessonData, StateOptions, TaskData, TestData } from '../../../common/state-types';
import { PagesList } from '../main';
import './auth-page.scss';

export class AuthPage extends Control {
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

    const onLogBtn: Control<HTMLButtonElement> = new Control(this.node, 'button', 'btn btn-primary btn-lg', 'Войти');
    onLogBtn.node.type = 'button';

    onLogBtn.node.onclick = (): Promise<void> => this.isAuthUser(emailInput.node.value, passInput.node.value);

    state.onUpdate.add((type: StateOptions) => {
      switch (type) {
        case StateOptions.validLogin:
          if (state.getLoginValid()) {
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
            inputText.node.textContent = 'Неверный логин или пароль!';
            inputText.node.classList.add('text-danger');
            inputText.node.classList.remove('text-warning');
          }
          break;
      }
    });
  }

  private async isAuthUser(login: string, password: string): Promise<void> {
    const user = await AuthController.isAuthUser(login, password);
    if (user) {
      state.setLoginValid(true);
      state.authUser();
      state.setUserData(user);
      state.setPassword(password);
      this.switchPage(user);
    } else {
      state.setLoginValid(false);
    }
  }

  private async switchPage(user: UserData): Promise<void> {
    const page: Places = user.place;
    let currentPageId = 0;
    if (user.done[page].length === 0) {
      state.setNewPage(PagesList.mainPage);
      return;
    } else {
      currentPageId = user.done[page].reverse()[0].id;
    }

    let data: LessonData | TestData | TaskData;
    switch (page) {
      case Places.lessons:
        data = await DataController.getLesson(currentPageId);
        state.setLesson(data);
        state.setNewPage(PagesList.lessonPage);
        break;
      case Places.tests:
        data = await DataController.getTest(currentPageId);
        state.setTest(data);
        state.setNewPage(PagesList.testPage);
        break;
      case Places.tasks:
        data = await DataController.getTask(currentPageId);
        state.setTask(data);
        state.setNewPage(PagesList.taskPage);
        break;
    }
  }
}
