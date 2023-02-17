import Control from '../../common/control';
import { state } from '../../common/state';
import { StateOptions } from '../../common/state-types';
import './animation-dark.scss';

export class AnimationDark extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'start');
    const normStart = new Control(this.node, 'div');
    normStart.node.setAttribute('id', 'normalstar');
    const start = new Control(this.node, 'div');
    start.node.setAttribute('id', 'star');

    state.onUpdate.add((type: StateOptions): void => {
      switch (type) {
        case StateOptions.changeAnimation:
          this.toggleAnimation(start.node);
          break;
      }
    });
  }

  private toggleAnimation(node: HTMLElement): void {
    let settings = state.getSettings();
    if (settings.animation) {
      node.style.animation = 'none';
    } else {
      node.style.animation = 'animStar 60s linear infinite';
    }
  }
}
