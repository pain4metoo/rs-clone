import { LessonData, TaskData, TestData } from '../common/state-types';
import { baseUrl, path } from './routes';
import { CategoryData } from './types';

export class DataController {
  public static async getCategories(): Promise<Array<CategoryData>> {
    const response: Response = await fetch(`${baseUrl}${path.categories}`);
    const categories: Array<CategoryData> = await response.json();
    return categories;
  }

  public static async getLesson(id: number): Promise<LessonData> {
    const response: Response = await fetch(`${baseUrl}${path.lessons}/${id}`);
    const lesson: LessonData = await response.json();
    return lesson;
  }

  public static async getTest(id: number): Promise<TestData> {
    const response: Response = await fetch(`${baseUrl}${path.tests}/${id}`);
    const test: TestData = await response.json();
    return test;
  }

  public static async getTask(id: number): Promise<TaskData> {
    const response: Response = await fetch(`${baseUrl}${path.tasks}/${id}`);
    const task: TaskData = await response.json();
    return task;
  }

  public static async getItemById(
    itemName: 'lessons' | 'tests' | 'tasks',
    itemId: number
  ): Promise<Array<CategoryData>> {
    let response: Response;
    if (itemName === 'lessons') {
      response = await fetch(`${baseUrl}${path.lessons}`);
    } else if (itemName === 'tests') {
      response = await fetch(`${baseUrl}${path.tests}`);
    } else {
      response = await fetch(`${baseUrl}${path.tasks}`);
    }
    const items: Array<CategoryData> = await response.json();
    return items.filter((e) => (e.id = itemId));
  }
}
