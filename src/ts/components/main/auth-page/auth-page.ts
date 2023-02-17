import { AuthController } from '../../../api/auth-controller';
import { DataController } from '../../../api/data-controller';
import { Places, UserData } from '../../../api/types';
import Control from '../../../common/control';
import { state } from '../../../common/state';
import { LessonData, TaskData, TestData } from '../../../common/state-types';
import { PagesList } from '../main';
import './auth-page.scss';

export class AuthPage extends Control {
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

    const onLogBtn: Control<HTMLButtonElement> = new Control(this.node, 'button', 'btn btn-primary btn-lg', 'Войти');
    onLogBtn.node.type = 'button';

    onLogBtn.node.onclick = (): Promise<void> => this.isAuthUser(emailInput.node.value, passInput.node.value);
  }

  private async isAuthUser(login: string, password: string): Promise<void> {
    const user = await AuthController.isAuthUser(login, password);
    if (user) {
      state.authUser();
      state.setUserData(user);
      this.switchPage(user);
    }
  }

  private async switchPage(user: UserData): Promise<void> {
    const page: Places = user.place;
    const currentPageId = user.done[page].slice(-1)[0].id;

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
