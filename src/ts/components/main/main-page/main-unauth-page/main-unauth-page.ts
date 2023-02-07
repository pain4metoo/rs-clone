import Control from '../../../../common/control';
import { HeaderUnauth } from '../../../header/header-unauth/header-unauth';

export class MainUnauthPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container');

    new Control(this.node, 'p', 'display-3 text-center', 'Описание приложения');
    new Control(
      this.node,
      'p',
      'text-center',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis doloribus aspernatur reiciendis! Odit voluptas pariatur saepe reiciendis possimus beatae omnis, dolorum dolorem animi cupiditate eos. Illum doloremque nemo dolor voluptas?'
    );

    const unauthHeader = new HeaderUnauth(this.node);
  }
}
