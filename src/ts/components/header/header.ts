import './header.scss';
import Control from '../../common/control';
import logoSVG from '../../../assets/svg/logo.svg';
import { NavBar } from './nav-menu/nav-menu';
import { HeaderAuth } from './header-auth/header-auth';
import { HeaderUnauth } from './header-unauth/header-unauth';

export class Header extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', 'header');

    const logo: { node: HTMLImageElement } = new Control(this.node, 'img', 'img-thumbnail');
    logo.node.src = logoSVG;
    logo.node.alt = 'logo javascript';

    const navBar: NavBar = new NavBar(this.node);
    const headerUnauth: HeaderUnauth = new HeaderUnauth(this.node);
  }
}
