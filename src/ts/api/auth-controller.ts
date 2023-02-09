import { NewUser, Places, UserData } from '../api/types';
import { baseUrl, path } from './routes';

export interface AuthResponse {
  status: boolean;
  user: UserData;
}

export class AuthController {
  public static async isAuthUser(login: string, password: string): Promise<void | AuthResponse> {
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
      const data = await response.json();

      return { status: response.ok, user: data.user };
    } catch (err) {
      console.log(err);
    }
  }

  public static async createNewUser(login: string, password: string, name: string): Promise<UserData> {
    // eslint-disable-next-line no-useless-catch
    try {
      const user: Partial<UserData> = {
        email: login,
        password: password,
        name: name,
        place: Places.lesson, //default value for a new user
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
