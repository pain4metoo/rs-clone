import Control from '../../../common/control';
import './spinner.scss';

export class Spinner extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'spinner-border text-danger spinner');
    this.node.setAttribute('role', 'status');

    const load = new Control(this.node, 'span', 'visually-hidden', 'Loading...');
  }
}
