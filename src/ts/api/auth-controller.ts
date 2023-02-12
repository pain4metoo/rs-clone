import { Places, UserData, UserResponse } from './types';
import { baseUrl, path } from './routes';

export class AuthController {
  public static async isAuthUser(login: string, password: string): Promise<void | UserData> {
    try {
      const body: Partial<UserData> = {
        email: login,
        password: password,
      };

      const response: Response = await fetch(`${baseUrl}${path.login}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data: UserResponse = await response.json();
      return data.user;
    } catch (err) {
      console.log(err);
    }
  }

  public static async createNewUser(login: string, password: string, name: string): Promise<UserData | void> {
    // eslint-disable-next-line no-useless-catch
    try {
      const user: Partial<UserData> = {
        email: login,
        password: password,
        name: name,
        place: Places.lessons, //default value for a new user
        done: { lessons: [{ id: 1 }], tests: [], tasks: [] }, //default value for a new user
      };

      const response: Response = await fetch(`${baseUrl}${path.register}`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const json: UserResponse = await response.json();
      return json.user;
    } catch (error) {
      console.log(error);
    }
  }
}
