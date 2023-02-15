import Control from '../../common/control';
import './animation-light.scss';

export class AnimationLight extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'light');

    const rayCount: number = 10;
    for (let i = 1; i < rayCount; i++) {
      new Control(this.node, 'div', `x${i}`);
    }
  }
}
