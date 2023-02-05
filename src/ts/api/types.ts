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
