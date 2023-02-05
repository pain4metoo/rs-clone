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

export interface UserData {
  id: string;
  email: string;
  password: string;
  name: string;
  done?: UserDataDone;
}

export interface UserDataDone {
  lessons: Array<{ id?: string; result?: string }>;
  tests: Array<{ id?: string; result?: string }>;
  tasks: Array<{ id?: string; result?: string }>;
}

export interface NewUser {
  email: string;
  password: string;
  [key: string]: any;
}
