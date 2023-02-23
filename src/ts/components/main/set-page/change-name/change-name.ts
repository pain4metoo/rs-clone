import Control from '../../../../common/control';
import { state } from '../../../../common/state';
import { StateOptions } from '../../../../common/state-types';

export class ChangeName extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'form form-name');

    const title = new Control(this.node, 'h5', 'display-5', 'Смена имени');
    const nameInputInner = new Control(this.node, 'div', 'form-floating mb-3');
    const nameInput: Control<HTMLInputElement> = new Control(nameInputInner.node, 'input', 'form-control');
    nameInput.node.type = 'text';
    nameInput.node.setAttribute('id', 'floatingInput');
    nameInput.node.setAttribute('placehnameer', 'Введите новое имя');
    const nameLabel: Control<HTMLLabelElement> = new Control(
      nameInputInner.node,
      'label',
      'label-name',
      `Текущее имя: ${state.getCurrentName()}`
    );
    nameLabel.node.setAttribute('for', 'floatingInput');

    const changeBtn: Control<HTMLButtonElement> = new Control(this.node, 'button', 'btn btn-primary', 'Сменить имя');
    changeBtn.node.setAttribute('type', 'button');
    changeBtn.node.setAttribute('data-bs-toggle', 'modal');
    changeBtn.node.setAttribute('data-bs-target', '#staticBackdrop');
    changeBtn.node.addEventListener('click', () => state.playSound());
    changeBtn.node.disabled = true;

    changeBtn.node.onclick = () => this.changeName(nameInput.node.value);
    nameInput.node.oninput = () => this.isDisableBtn(changeBtn.node, nameInput.node.value);

    state.onUpdate.add((type: StateOptions) => {
      switch (type) {
        case StateOptions.changeName:
          const newName = state.getCurrentName();
          nameLabel.node.textContent = `Текущее имя: ${newName}`;
          nameInput.node.value = '';
          changeBtn.node.disabled = true;
          break;
      }
    });
  }

  private isDisableBtn(btn: HTMLButtonElement, name: string): void {
    if (name.length > 3 && name.length < 30) {
      btn.disabled = false;
    }
  }

  private async changeName(name: string): Promise<void> {
    state.setUserName(name);
  }
}
