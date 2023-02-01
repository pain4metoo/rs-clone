import Control from '../common/control';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Main } from './main/main';

export class App extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'wrapper');
    new Header(this.node);
    new Main(this.node);
    new Footer(this.node);
  }
}
