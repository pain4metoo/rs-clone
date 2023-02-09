import { CategoryData, UserData } from '../api/types';
import { PagesList } from '../components/main/main';
import Signal from './signal';
import {
  ArticleMetaData,
  CategoriesType,
  CategoryContent,
  CurrentPage,
  HeaderPages,
  LessonData,
  StateData,
  StateOptions,
  TaskData,
  TestData,
} from './state-types';

class State {
  private _data: StateData;
  public onUpdate: Signal<StateOptions> = new Signal();
  constructor(initialState: StateData) {
    this._data = initialState;
  }

  public setNewPage(page: PagesList, id?: number): void {
    this._data.currentPage = { name: page, id };
    this.onUpdate.emit(StateOptions.changePage);
  }

  public authUser(user: UserData): void {
    this._data.currentPage = { name: PagesList.mainPage };
    this._data.user.place = user.place;
    this._data.user.isAuth = true;
    this.onUpdate.emit(StateOptions.changePage);
  }

  public setCategories(categories: Array<CategoryData>): void {
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

  public setLesson(lesson: LessonData): void {
    this._data.lesson = lesson;
  }

  public setTest(test: TestData): void {
    this._data.test = test;
  }

  public setTask(task: TaskData): void {
    this._data.task = task;
  }

  public getCurrentPage(): CurrentPage {
    return this._data.currentPage;
  }

  public getHeaderPages(): HeaderPages {
    return this._data.header;
  }

  public getCategories(key: keyof CategoriesType): Array<CategoryContent> {
    return this._data.categories[key];
  }

  public getLesson(): LessonData {
    return this._data.lesson;
  }

  public getTest(): TestData {
    return this._data.test;
  }

  public getTask(): TaskData {
    return this._data.task;
  }

  public getAuthUser(): boolean {
    return this._data.user.isAuth;
  }

  public getCurrentUserPlace(): Array<string> {
    return this._data.user.place;
  }
}

const initialState = {
  user: {
    isAuth: false,
    place: ['lessons', '1'],
  },
  currentPage: { name: PagesList.mainPage },
  header: {
    mainPages: [PagesList.mainPage, PagesList.lessonsPage, PagesList.testsPage, PagesList.tasksPage],
    authPages: [PagesList.favorPage, PagesList.statistPage, PagesList.setPage, PagesList.logout],
    unAuthPages: [PagesList.authPage, PagesList.unauthPage],
  },
  categories: {
    lessons: [],
    tests: [],
    tasks: [],
  },
  lesson: {
    id: 0,
    name: '',
    content: [],
  },
  test: {
    id: 0,
    name: '',
    questions: [],
  },
  task: {
    id: 0,
    name: '',
    list: [],
  },
};

export const state: State = new State(initialState);
