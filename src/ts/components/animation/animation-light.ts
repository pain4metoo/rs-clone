import Control from '../../common/control';
import { state } from '../../common/state';
import { StateOptions } from '../../common/state-types';
import './animation-light.scss';

export class AnimationLight extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'bg-animation');

    state.onUpdate.add((type: StateOptions): void => {
      switch (type) {
        case StateOptions.changeAnimation:
          this.toggleAnimation();
          break;
      }
    });
  }

  private toggleAnimation(): void {
    let settings = state.getSettings();
    if (settings.animation) {
      this.node.style.animation = 'none';
    } else {
      this.node.style.animation = 'animStar 120s linear infinite';
    }
  }
}
