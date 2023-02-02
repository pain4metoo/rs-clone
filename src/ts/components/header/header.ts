import './header.scss';
import Control from '../../common/control';
import logoSVG from '../../../assets/svg/logo.svg';
import { NavBar } from './nav-menu/nav-menu';
import { HeaderUnauth } from './header-unauth/header-unauth';
import { state } from '../../common/state';

export class Header extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', 'header');

    const logo: { node: HTMLImageElement } = new Control(this.node, 'img', 'header-img img-thumbnail');
    logo.node.src = logoSVG;
    logo.node.alt = 'logo javascript';
    logo.node.onclick = () => this.onMainPage();

    const navBar: NavBar = new NavBar(this.node);
    const headerUnauth: HeaderUnauth = new HeaderUnauth(this.node);
  }

  private onMainPage(): void {
    state.setNewPage('Главная');
  }
}
