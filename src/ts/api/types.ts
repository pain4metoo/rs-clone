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
  lessons = 'lessons',
  tests = 'tests',
  tasks = 'tasks',
}

export interface UserData {
  id: number;
  email: string;
  password: string;
  name: string;
  done: UserDataDone;
  place: Places;
  favourites: UserDataFavorites;
  settings: Settings;
  avatar: string;
}

export interface UserDataDone {
  lessons: Array<{ id: number }>;
  tests: Array<{ id: number; result: number }>;
  tasks: Array<{ id: number; list: Array<number> }>;
}

export interface UserDataFavorites {
  lessons: Array<{ id: number }>;
  tests: Array<{ id: number }>;
  tasks: Array<{ id: number }>;
}

export interface UserResponse {
  accessToken: string;
  user: UserData;
}

export interface Settings {
  theme: boolean;
  animation: boolean;
  resetProgress: boolean;
  sound: boolean;
  volume: number;
  isValid: boolean;
}

export enum SettingsItems {
  theme = 'theme',
  animation = 'animation',
  resetProgress = 'resetProgress',
  sound = 'sound',
  volume = 'volume',
}
