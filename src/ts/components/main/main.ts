import Control from '../../common/control';

export class Main extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', 'main');

    const mainInner = new Control(this.node, 'div', 'main_inner');
  }
}
