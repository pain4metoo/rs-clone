import Control from '../../common/control';
import './footer.scss';
import logo from '../../../assets/image/footer-logo.png';

export class Footer extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'footer', 'footer container');
    const logoLink: Control<HTMLLinkElement> = new Control(this.node, 'a');
    logoLink.node.href = 'https://rs.school/';
    logoLink.node.setAttribute('target', 'blank');
    const rssSchool: Control<HTMLImageElement> = new Control(logoLink.node, 'img', 'footer_logo');
    rssSchool.node.src = logo;
    rssSchool.node.alt = 'footer logo';

    new Control(this.node, 'p', 'footer_year', '2023');

    const footer_dev = new Control(this.node, 'div', 'footer_dev');
    const devZhenya: Control<HTMLLinkElement> = new Control(footer_dev.node, 'a', 'footer_link link', 'pain4metoo');
    devZhenya.node.href = 'https://github.com/pain4metoo';
    devZhenya.node.setAttribute('target', 'blank');
    const devTanya: Control<HTMLLinkElement> = new Control(footer_dev.node, 'a', 'footer_link link', 'Tati-Zhurr');
    devTanya.node.href = 'https://github.com/Tati-Zhurr';
    devTanya.node.setAttribute('target', 'blank');
    const devZhenya1: Control<HTMLLinkElement> = new Control(footer_dev.node, 'a', 'footer_link link', 'Evermishka');
    devZhenya1.node.href = 'https://github.com/Evermishka';
    devZhenya1.node.setAttribute('target', 'blank');
  }
}
