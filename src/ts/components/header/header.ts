//import './header.scss';
import Control from '../../common/control';
import logoSVG from '../../../assets/svg/logo.svg';
import { NavBar } from './nav-menu/nav-menu';
import { HeaderUnauth } from './header-unauth/header-unauth';
import { state } from '../../common/state';
import { PagesList } from '../main/main';
import { HeaderAuth } from './header-auth/header-auth';
import { StateOptions } from '../../common/state-types';

export class Header extends Control {
  private headerAuth!: Control<HTMLElement>;
  private headerUnauth!: Control<HTMLElement>;
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

    this.createAuthUnauthHeader(collapse);

    state.onUpdate.add((type: StateOptions) => {
      if (type === StateOptions.changePage) {
        this.createAuthUnauthHeader(collapse);
      }
    });
  }

  private createAuthUnauthHeader(parentNode: Control<HTMLElement>): void {
    if (this.headerAuth) {
      this.headerAuth.destroy();
    }
    if (this.headerUnauth) {
      this.headerUnauth.destroy();
    }
    if (state.getAuthUser()) {
      this.headerAuth = new HeaderAuth(parentNode.node);
    } else {
      this.headerUnauth = new HeaderUnauth(parentNode.node);
    }
  }

  private onMainPage(): void {
    state.setNewPage(PagesList.mainPage);
  }
}
