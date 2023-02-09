import { NewUser, places, UserData } from '../api/types';
import { baseUrl, path } from './routes';

export class AuthController {
  public static async isAuthUser(login: string, password: string): Promise<boolean | void> {
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

      return response.ok;
    } catch (err) {
      console.log(err);
    }
  }

  public static async createNewUser(login: string, password: string, name: string): Promise<UserData> {
    // eslint-disable-next-line no-useless-catch
    try {
      const user: UserData = {
        email: login,
        password: password,
        name: name,
        place: places.lesson, //default value for a new user
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

      const json: UserData = await response.json();

      return json;
    } catch (error) {
      throw error;
    }
  }
}
