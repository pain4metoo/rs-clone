import Control from '../common/control';
import { state } from '../common/state';
import { StateOptions } from '../common/state-types';
import { AnimationDark } from './animation/animation-dark';
import { AnimationLight } from './animation/animation-light';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Main } from './main/main';

export class App extends Control {
  animLight!: AnimationLight;
  animDark!: AnimationDark;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container-fluid');
    new Header(this.node);
    new Main(this.node);
    new Footer(this.node);
    this.createAnimation();
    state.onUpdate.add((type: StateOptions) => {
      if (type === StateOptions.changeTheme) {
        this.createAnimation();
      }
    });
  }

  private async createAnimation(): Promise<void> {
    if (this.animDark) {
      this.animDark.destroy();
    }
    if (this.animLight) {
      this.animLight.destroy();
    }
    let settings = state.getSettings();
    if (settings.theme) {
      this.animLight = new AnimationLight(this.node);
    } else {
      this.animDark = new AnimationDark(this.node);
    }
  }
}
