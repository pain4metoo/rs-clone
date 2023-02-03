//import './header.scss';
import Control from '../../common/control';
import logoSVG from '../../../assets/svg/logo.svg';
import { NavBar } from './nav-menu/nav-menu';
import { HeaderUnauth } from './header-unauth/header-unauth';
import { state } from '../../common/state';

export class Header extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', 'header container');

    const navigation = new Control(this.node, 'nav', 'navbar navbar-expand-md navbar-light');
    const container = new Control(navigation.node, 'div', 'container-fluid justify-content-between');

    const logoLink: Control<HTMLLinkElement> = new Control(container.node, 'a', 'navbar-brand flex-grow-1');
    logoLink.node.href = '#';
    logoLink.node.onclick = (): void => this.onMainPage();
    const logoImg: Control<HTMLImageElement> = new Control(logoLink.node, 'img', 'navbar-brand');
    logoImg.node.src = logoSVG;
    logoImg.node.alt = 'logo javascript';
    logoImg.node.height = 60;

    const navbarToggler: Control<HTMLButtonElement> = new Control(container.node, 'button', 'navbar-toggler');
    navbarToggler.node.type = 'button';
    navbarToggler.node.setAttribute('data-bs-toggle', 'collapse');
    navbarToggler.node.setAttribute('data-bs-target', '#navbarNav');
    navbarToggler.node.setAttribute('aria-controls', 'navbarNav');
    navbarToggler.node.setAttribute('aria-expanded', 'false');
    navbarToggler.node.setAttribute('aria-label', 'Переключатель навигации');
    new Control(navbarToggler.node, 'span', 'navbar-toggler-icon');

    const collapse = new Control(container.node, 'div', 'collapse navbar-collapse justify-content-between');
    collapse.node.id = 'navbarNav';
    const navBar: NavBar = new NavBar(collapse.node);
    const headerUnauth: HeaderUnauth = new HeaderUnauth(collapse.node);
  }

  private onMainPage(): void {
    state.setNewPage('Главная');
  }
}
