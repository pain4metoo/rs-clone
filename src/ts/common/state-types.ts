import { UserData } from '../api/types';
import { PagesList } from '../components/main/main';

export interface CurrentPage {
  name: PagesList;
  id?: number;
}

export interface HeaderPages {
  mainPages: Array<PagesList>;
  authPages: Array<PagesList>;
  unAuthPages: Array<PagesList>;
}

export interface ArticleMetaData {
  id: number;
  name: string;
}

export interface CategoryContent {
  name: string;
  items: Array<ArticleMetaData>;
}

export interface CategoriesType {
  lessons: Array<CategoryContent>;
  tests: Array<CategoryContent>;
  tasks: Array<CategoryContent>;
}

export interface LessonContent {
  tag: string;
  class: string;
  text: string;
}

export interface LessonData {
  category: string;
  id: number;
  name: string;
  content: Array<string>;
  comments: Array<CommentData>;
}

export interface TestAnswer {
  id: number;
  text: string;
}

export interface TestQuestion {
  id: number;
  question: string;
  answers: Array<TestAnswer>;
  rightAnswer: Array<number>;
}

export interface TestData {
  category: string;
  id: number;
  name: string;
  questions: Array<TestQuestion>;
}

export interface TaskList {
  content: string;
  solution: string;
}

export interface TaskData {
  category: string;
  id: number;
  name: string;
  list: Array<TaskList>;
}
export interface CommentData {
  id: number;
  userName: string;
  content: string;
}

export interface StateData {
  isAuth: boolean;
  user: UserData;
  currentPage: CurrentPage;
  header: HeaderPages;
  categories: CategoriesType;
  lesson: LessonData;
  test: TestData;
  task: TaskData;
}

export enum StateOptions {
  changePage = 'change-page',
  changeTheme = 'change-theme',
  changeAnimation = 'change-animation',
  changeProgress = 'change-progress',
  changeSound = 'change-sound',
  changeVolume = 'change-volume',
  onLogUser = 'onlogin-user',
  changePassword = 'change-password',
  resetSettings = 'reset-settings',
  saveSettings = 'save-settings',
}
