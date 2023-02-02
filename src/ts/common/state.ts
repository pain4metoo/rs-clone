import Signal from './signal';

interface HeaderPages {
  mainPages: Array<string>;
  authPages: Array<string>;
  unAuthPages: Array<string>;
  currentPage: string;
}

export interface StateData {
  header: HeaderPages;
}

export enum StateOptions {
  changePage = 'change-page',
}

export enum PagesList {
  mainPage = 'Главная',
  lessonPage = 'Уроки',
  testPage = 'Тесты',
  taskPage = 'Задачи',
  favorPage = 'Избранное',
  statistPage = 'Статистика',
  setPage = 'Настройки',
  authPage = 'Войти',
  unauthPage = 'Зарегистрироваться',
}

export class State {
  private _data: StateData;
  public onUpdate: Signal<StateOptions> = new Signal();
  constructor(initialState: StateData) {
    this._data = initialState;
  }

  public setNewPage(page: string): void {
    this._data.header.currentPage = page;
    this.onUpdate.emit(StateOptions.changePage);
  }

  public getHeaderPages(): HeaderPages {
    return this._data.header;
  }
}

export const state: State = new State({
  header: {
    mainPages: ['Главная', 'Уроки', 'Тесты', 'Задачи'],
    authPages: ['Избранное', 'Статистика', 'Настройки', 'Выйти'],
    unAuthPages: ['Войти', 'Зарегистрироваться'],
    currentPage: 'Главная',
  },
});
