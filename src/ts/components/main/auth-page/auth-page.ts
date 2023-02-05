import { AuthController } from '../../../api/auth-controller';
import Control from '../../../common/control';
import './auth-page.scss';

export class AuthPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'auth');

    const onLogBtn: Control<HTMLButtonElement> = new Control(this.node, 'button', 'btn btn-outline-primary');
    onLogBtn.node.type = 'button';

    onLogBtn.node.onclick = (): Promise<void> => this.isAuthUser('testemail@email.com', '12345');
  }

  private async isAuthUser(login: string, password: string): Promise<void> {
    let isAuth = await AuthController.isAuthUser(login, password);

    console.log(isAuth);
  }
}
