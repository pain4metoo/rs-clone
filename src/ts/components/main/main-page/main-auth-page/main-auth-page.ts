import Control from '../../../../common/control';
import { state } from '../../../../common/state';
import { HeaderAuth } from '../../../header/header-auth/header-auth';

export class MainAuthPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container');

    const currentName = state.getUser().name || '';

    new Control(this.node, 'p', 'text-center display-4', `Привет ${currentName}!`);
    new HeaderAuth(this.node);
  }
}
