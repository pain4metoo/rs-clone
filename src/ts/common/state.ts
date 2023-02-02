import Signal from './signal';

interface HeaderPages {
  mainPages: Array<string>;
  authPages: Array<string>;
  unAuthPages: Array<string>;
}

export interface StateData {
  header: HeaderPages;
}

export enum StateOptions {}

export class State {
  private _data: StateData;
  public onUpdate: Signal<StateOptions> = new Signal();
  constructor(initialState: StateData) {
    this._data = initialState;
  }

  public getHeaderPages(): HeaderPages {
    return this._data.header;
  }
}

export const state: State = new State({
  header: {
    mainPages: ['Уроки', 'Тесты', 'Задачи'],
    authPages: ['Избранное', 'Статистика', 'Настройки', 'Выйти'],
    unAuthPages: ['Войти', 'Зарегистрироваться'],
  },
});
