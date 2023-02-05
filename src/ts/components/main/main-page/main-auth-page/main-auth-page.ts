import Control from '../../../../common/control';
import { HeaderAuth } from '../../../header/header-auth/header-auth';

export class MainAuthPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container');

    const welcomeText = new Control(this.node, 'p', 'text-center display-4', 'Приветствие');
    new HeaderAuth(this.node);
  }
}
