import { CategoryData, Places, UserData } from '../api/types';
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
    if (page === PagesList.logout) {
      this._data.isAuth = false;
    }
    this._data.currentPage = { name: page, id };
    this.onUpdate.emit(StateOptions.changePage);
  }

  public authUser(): void {
    this._data.currentPage = { name: PagesList.mainPage };
    this._data.isAuth = true;
  }

  public setUserData(userData: UserData): void {
    this._data.user = userData;
    this.onUpdate.emit(StateOptions.changePage);
  }

  public setCategories(categories: Array<CategoryData>): void {
    categories.forEach((category) => {
      const lessons: Array<ArticleMetaData> = [];
      category.lessons.forEach((el) => {
        lessons.push({
          id: +el.id,
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
          id: +el.id,
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
          id: +el.id,
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
    return this._data.isAuth;
  }

  public getUser(): UserData {
    return this._data.user;
  }
}

const initialState = {
  isAuth: false,
  user: {
    id: 0,
    email: '',
    password: '',
    name: '',
    done: {
      lessons: [],
      tests: [],
      tasks: [],
    },
    place: Places.lesson,
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
    category: '',
    id: 0,
    name: '',
    content: [],
  },
  test: {
    category: '',
    id: 0,
    name: '',
    questions: [],
  },
  task: {
    category: '',
    id: 0,
    name: '',
    list: [],
  },
};

export const state: State = new State(initialState);
