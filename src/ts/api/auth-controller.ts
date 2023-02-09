import { NewUser, places, UserData } from '../api/types';
import { baseUrl, path } from './routes';

export class AuthController {
  public static async isAuthUser(login: string, password: string): Promise<UserData | void> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response: Response = await fetch(`${baseUrl}${path.users}`);
      const users: Array<UserData> = await response.json();
      let currentUser!: UserData;
      users.forEach((user: UserData): void => {
        if (user.email === login && user.password === password) {
          currentUser = user;
        }
      });

      return currentUser;
    } catch (err) {
      throw err;
    }
  }

  public static async createNewUser(login: string, password: string, name: string): Promise<UserData> {
    try {
      const user: UserData = {
        id: '1',
        email: login,
        password: password,
        name: name,
        done: {
          lessons: [
            {
              id: '1',
            },
          ],
          tests: [
            {
              id: '1',
              result: '90',
            },
          ],
          tasks: [
            {
              id: '1',
            },
          ],
        },
        place: [places.lessons, '1'],
      };

      const response: Response = await fetch(`${baseUrl}/register`, {
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
