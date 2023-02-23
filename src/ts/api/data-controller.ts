import { state } from '../common/state';
import { LessonData, TaskData, TestData } from '../common/state-types';
import { PagesList } from '../components/main/main';
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

  public static async updateUserData(): Promise<void> {
    try {
      const user = state.getUser();
      const response: Response = await fetch(`${baseUrl}${path.users}/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public static async updateLessonComments(): Promise<void> {
    try {
      const lesson = state.getLesson();
      const response: Response = await fetch(`${baseUrl}${path.lessons}/${lesson.id}`, {
        method: 'PATCH',
        body: JSON.stringify(lesson),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const lessonWithNewComment = await this.getLesson(lesson.id);
        state.setLesson(lessonWithNewComment);
        //state.setNewPage(PagesList.lessonPage);
      } else {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
