export interface CategoryItemsData {
  id: number;
  name: string;
}

export interface CategoryData {
  id: 'number';
  name: 'string';
  lessons: Array<CategoryItemsData>;
  tests: Array<CategoryItemsData>;
  tasks: Array<CategoryItemsData>;
}

export enum Places {
  lessons = 'lessons',
  tests = 'tests',
  tasks = 'tasks',
}

export interface UserDataBase {
  email: string;
  password: string;
}

export interface UserDataCreate extends UserDataBase {
  email: string;
  password: string;
  name: string;
}

export interface UserDataExtended extends UserDataBase {
  id: number;
  email: string;
  password: string;
  name: string;
  done: UserDataExtendedDone;
  place: Places;
}

export interface UserDataExtendedDone {
  lessons: Array<{ id: number; }>;
  tests: Array<{ id: number; result: number }>;
  tasks: Array<{ id: number; }>;
}

export interface NewUser {
  email: string;
  password: string;
  [key: string]: any;
}
