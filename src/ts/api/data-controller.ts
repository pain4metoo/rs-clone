import { LessonData, TaskData, TestData } from '../common/state-types';
import { baseUrl, path } from './routes';
import { CategoryData } from './types';

export class DataController {
  public static async getCategories(): Promise<Array<CategoryData> | void> {
    try {
      const response: Response = await fetch(`${baseUrl}${path.categories}`);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      
      const categories: Array<CategoryData> = await response.json();

      return categories;
    } catch (err) {
      console.log(err);
    }
  }

  public static async getLesson(id: number): Promise<LessonData | void> {
    try {
      const response: Response = await fetch(`${baseUrl}${path.lessons}/${id}`);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const lesson: LessonData = await response.json();

      return lesson;
    } catch (err) {
      console.log(err);
    }
  }

  public static async getTest(id: number): Promise<TestData | void> {
    try {
      const response: Response = await fetch(`${baseUrl}${path.tests}/${id}`);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const test: TestData = await response.json();

      return test;
    } catch (err) {
      console.log(err);
    }
  }

  public static async getTask(id: number): Promise<TaskData | void> {
    try {
      const response: Response = await fetch(`${baseUrl}${path.tasks}/${id}`);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const task: TaskData = await response.json();

      return task;
    } catch (err) {
      console.log(err);
    }
  }
}
