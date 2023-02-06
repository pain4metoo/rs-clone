import { baseUrl, path } from './routes';
import { CategoryData } from './types';

export class DataController {
  public static async getCategories(): Promise<Array<CategoryData>> {
    const response: Response = await fetch(
      `${baseUrl}${path.categories}`
    );
    const categories: Array<CategoryData> = await response.json();
    return categories;
  }
  
  public static async getLessons(): Promise<Array<CategoryData>> {
    const response: Response = await fetch(
      `${baseUrl}${path.lessons}`
    );
    const lessons: Array<CategoryData> = await response.json();
    return lessons;
  }
}