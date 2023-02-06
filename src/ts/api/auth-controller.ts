import { NewUser, UserData } from '../api/types';
import { baseUrl, path } from './routes';

export class AuthController {
  public static async isAuthUser(login: string, password: string): Promise<boolean | void> {
    try {
      const body: UserData = {
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
    try {
      const user: UserData = {
        email: login,
        password: password,
        name: name,
      };

      const response: Response = await fetch(`${baseUrl}${path.register}`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json: UserData = await response.json();

      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
