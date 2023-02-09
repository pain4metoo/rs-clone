import { NewUser, UserDataBase, UserDataCreate, UserDataExtended } from '../api/types';
import { baseUrl, path } from './routes';

export interface AuthResponse {
  status: boolean;
  user: UserDataExtended;
}

export class AuthController {
  public static async isAuthUser(login: string, password: string): Promise<void | AuthResponse> {
    try {
      const body: UserDataBase = {
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

  public static async createNewUser(login: string, password: string, name: string): Promise<UserDataExtended> {
    try {
      const user: UserDataCreate = {
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

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const json: UserDataExtended = await response.json();

      return json;
    } catch (error) {
      throw error;
    }
  }
}
