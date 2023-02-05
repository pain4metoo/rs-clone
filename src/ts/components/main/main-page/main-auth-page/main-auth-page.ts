import Control from '../../../../common/control';

export class MainAuthPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode);

    this.node.textContent = 'Auth-page';
  }
}
