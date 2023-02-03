import { CategoryData } from '../api/types';
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

export interface CategoriesType {
  lessons: Array<CategoryContent>;
  tests: Array<CategoryContent>;
  tasks: Array<CategoryContent>;
}

export interface StateData {
  header: HeaderPages;
  categories: CategoriesType;
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

  public setCategories(categories: Array<CategoryData>) {
    categories.forEach((category) => {
      const lessons: Array<ArticleMetaData> = [];
      category.lessons.forEach((el) => {
        lessons.push({
          id: el.id,
          name: el.name,
        });
      });
      this._data.categories.lessons.push({
        name: category.name,
        items: lessons,
      });
      const tests: Array<ArticleMetaData> = [];
      category.tests.forEach((el) => {
        tests.push({
          id: el.id,
          name: el.name,
        });
      });
      this._data.categories.tests.push({
        name: category.name,
        items: tests,
      });
      const tasks: Array<ArticleMetaData> = [];
      category.tasks.forEach((el) => {
        tasks.push({
          id: el.id,
          name: el.name,
        });
      });
      this._data.categories.tasks.push({
        name: category.name,
        items: tasks,
      });
    });
  }

  public getHeaderPages(): HeaderPages {
    return this._data.header;
  }

  public getCategories(key: keyof CategoriesType): Array<CategoryContent> {
    return this._data.categories[key];
  }
}

const initialState = {
  header: {
    mainPages: ['Главная', 'Уроки', 'Тесты', 'Задачи'],
    authPages: ['Избранное', 'Статистика', 'Настройки', 'Выйти'],
    unAuthPages: ['Войти', 'Зарегистрироваться'],
    currentPage: 'Главная',
  },
  categories: {
    lessons: [],
    tests: [],
    tasks: [],
  },
};

export const state: State = new State(initialState);