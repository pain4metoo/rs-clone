import { SettingsController } from '../api/settings-controller';
import { DataController } from '../api/data-controller';
import { CategoryData, Places, Settings, SettingsItems, UserData } from '../api/types';
import { PagesList } from '../components/main/main';
import Signal from './signal';
import {
  ArticleMetaData,
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
    this.onUpdate.emit(StateOptions.changeTheme);
    this.onUpdate.emit(StateOptions.changeAnimation);
    this.onUpdate.emit(StateOptions.changeProgress);
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

  public async setTheme(theme: boolean): Promise<void> {
    this._data.user.settings[SettingsItems.theme] = theme;
    this.onUpdate.emit(StateOptions.changeTheme);
    this.onUpdate.emit(StateOptions.changeAnimation);
  }
  public async setAnimation(animation: boolean): Promise<void> {
    this._data.user.settings[SettingsItems.animation] = animation;
    this.onUpdate.emit(StateOptions.changeAnimation);
  }
  public async setProgress(progress: boolean): Promise<void> {
    this._data.user.settings[SettingsItems.resetProgress] = progress;
    this.onUpdate.emit(StateOptions.changeProgress);
  }
  public async setSound(sound: boolean): Promise<void> {
    this._data.user.settings[SettingsItems.sound] = sound;
    this.onUpdate.emit(StateOptions.changeSound);
  }
  public async setVolume(volume: number): Promise<void> {
    this._data.user.settings[SettingsItems.volume] = volume;
    this.onUpdate.emit(StateOptions.changeVolume);
  }

  public async saveSettings(): Promise<void> {
    this.onUpdate.emit(StateOptions.saveSettings);
    await SettingsController.setSettings();
    if (this._data.user.settings.resetProgress) {
      this._data.user.done = {
        lessons: [],
        tests: [],
        tasks: [],
      };
      this._data.user.settings.resetProgress = false;
      await DataController.updateUserData();
    }
  }

  public setPassword(currentPassword: string): void {
    this._data.user.password = currentPassword;
  }

  public setNewPassword(newPassword: string, oldPassword: string): void {
    if (oldPassword === this._data.user.password && newPassword.length > 3) {
      this._data.user.password = newPassword;
      this._data.user.settings.isValid = true;
    } else {
      this._data.user.settings.isValid = false;
    }
    this.onUpdate.emit(StateOptions.changePassword);
  }

  public resetSettings(): void {
    this.onUpdate.emit(StateOptions.resetSettings);
  }

  public getPasswordValidate(): boolean {
    return this._data.user.settings.isValid;
  }

  public getCurrentPage(): CurrentPage {
    return this._data.currentPage;
  }

  public getHeaderPages(): HeaderPages {
    return this._data.header;
  }

  public getCategories(key: Places): Array<CategoryContent> {
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

  public getSettings(): Settings {
    return this._data.user.settings;
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
    place: Places.lessons,
    favourites: {
      lessons: [],
      tests: [],
      tasks: [],
    },
    settings: {
      theme: false,
      animation: false,
      resetProgress: false,
      sound: true,
      volume: 0.4,
      isValid: false,
    },
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
    comments: [],
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
