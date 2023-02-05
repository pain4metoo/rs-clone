import { PagesList } from "../components/main/main";

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
  id: number;
  name: string;
  content: Array<LessonContent>
}

export interface TestAnswer {
  id: number;
  text: string;
}

export interface TestQuestion {
  id: number;
  question: string;
  answersVariants: Array<TestAnswer>;
  answersRight: Array<number>;
}

export interface TestData {
  id: number;
  name: string;
  questions: Array<TestQuestion>
}

export interface TaskList {
  content: string;
  solution: string;
}

export interface TaskData {
  id: number;
  name: string;
  list: Array<TaskList>
}

export interface StateData {
  currentPage: CurrentPage;
  header: HeaderPages;
  categories: CategoriesType;
  lesson: LessonData;
  test: TestData;
  task: TaskData;
}

export enum StateOptions {
  changePage = 'change-page',
}