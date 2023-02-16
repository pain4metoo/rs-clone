import Control from '../../common/control';
import './animation-dark.scss';

export class AnimationDark extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'start');
    const normStart = new Control(this.node, 'div');
    normStart.node.setAttribute('id', 'normalstar');
    const start = new Control(this.node, 'div');
    start.node.setAttribute('id', 'star');
  }
}
