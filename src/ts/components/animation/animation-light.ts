import Control from '../../common/control';
import './animation-light.scss';

export class AnimationLight extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'bg-animation');
  }
}
