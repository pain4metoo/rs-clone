import Control from '../common/control';
import { state } from '../common/state';
import { StateOptions } from '../common/state-types';
import { AnimationDark } from './animation/animation-dark';
import { AnimationLight } from './animation/animation-light';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { AudioEl } from './main/audio-el/audio-el';
import { Main } from './main/main';

export class App extends Control {
  animLight!: AnimationLight;
  animDark!: AnimationDark;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'wrapper');
    new Header(this.node);
    new Main(this.node);
    new Footer(this.node);

    this.createAnimation();
    this.createAudioSounds();
    state.onUpdate.add((type: StateOptions) => {
      switch (type) {
        case StateOptions.changeTheme:
          this.createAnimation();
        case StateOptions.onLogUser:
          this.createAnimation();
          break;
      }
    });
  }

  private async createAudioSounds(): Promise<void> {
    new AudioEl();
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
      this.animLight = new AnimationLight(document.body);
      this.node.style.color = 'black';
    } else {
      this.animDark = new AnimationDark(document.body);
      this.node.style.color = 'white';
    }
  }
}
