import Signal from './signal';

interface HeaderPages {
  mainPages: Array<string>;
  authPages: Array<string>;
  unAuthPages: Array<string>;
  currentPage: string;
}

interface ArticleMetaData {
  id: number;
  name: string;
}

interface CategoryContent {
  name: string;
  items: Array<ArticleMetaData>;
}

interface CategoriesContent {
  lessons: Array<CategoryContent>;
  tests: Array<CategoryContent>;
  tasks: Array<CategoryContent>;
}

export interface StateData {
  header: HeaderPages;
  categories: CategoriesContent;
}

export enum StateOptions {
  changePage = 'change-page',
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

  public getCategories(key: keyof CategoriesContent): Array<CategoryContent> {
    return this._data.categories[key];
  }
}

export const state: State = new State({
  header: {
    mainPages: ['Главная', 'Уроки', 'Тесты', 'Задачи'],
    authPages: ['Избранное', 'Статистика', 'Настройки', 'Выйти'],
    unAuthPages: ['Войти', 'Зарегистрироваться'],
    currentPage: 'Главная',
  },
  categories: {
    lessons: [
      {
        name: 'Основы JavaScript',
        items: [
          {
            id: 1,
            name: 'Привет, мир!',
          },
          {
            id: 2,
            name: 'Структура кода',
          },
          {
            id: 3,
            name: 'Переменные',
          },
        ],
      },
      {
        name: 'Типы данных',
        items: [
          {
            id: 4,
            name: 'Методы примитивов',
          },
          {
            id: 5,
            name: 'Числа',
          },
          {
            id: 6,
            name: 'Строки',
          },
        ],
      },
    ],
    tests: [
      {
        name: 'Основы JavaScript',
        items: [
          {
            id: 1,
            name: 'Тест по теме: Привет, мир!',
          },
          {
            id: 2,
            name: 'Тест по теме: Структура кода',
          },
          {
            id: 3,
            name: 'Тест по теме: Переменные',
          },
        ],
      },
      {
        name: 'Типы данных',
        items: [
          {
            id: 4,
            name: 'Тест по теме: Методы примитивов',
          },
          {
            id: 5,
            name: 'Тест по теме: Числа',
          },
          {
            id: 6,
            name: 'Тест по теме: Строки',
          },
        ],
      },
    ],
    tasks: [
      {
        name: 'Основы JavaScript',
        items: [
          {
            id: 1,
            name: 'Задачи по теме: Привет, мир!',
          },
          {
            id: 2,
            name: 'Задачи по теме: Структура кода',
          },
          {
            id: 3,
            name: 'Задачи по теме: Переменные',
          },
        ],
      },
      {
        name: 'Типы данных',
        items: [
          {
            id: 4,
            name: 'Задачи по теме: Методы примитивов',
          },
          {
            id: 5,
            name: 'Задачи по теме: Числа',
          },
          {
            id: 6,
            name: 'Задачи по теме: Строки',
          },
        ],
      },
    ],
  },
});
