export interface CategoryItemsData {
  id: number;
  name: string;
}

export interface CategoryData {
  id: number;
  name: 'string';
  lessons: Array<CategoryItemsData>;
  tests: Array<CategoryItemsData>;
  tasks: Array<CategoryItemsData>;
}

export enum Places {
  lesson = 'lesson',
  test = 'test',
  task = 'task',
}

export interface UserData {
  email: string;
  password: string;
  name: string;
  done: UserDataDone;
  place: Places;
}

export interface UserDataDone {
  lessons: Array<{ id: number }>;
  tests: Array<{ id: number; result: number }>;
  tasks: Array<{ id: number }>;
}
