import { UserData } from '../common/state-types';
import { baseUrl, path } from './routes';

export class AuthController {
  public static async isAuthUser(login: string, password: string): Promise<void | UserData> {
    try {
      const response: Response = await fetch(`${baseUrl}${path.users}`);
      const users: Array<UserData> = await response.json();
      users.forEach((user: UserData) => {
        if (user.email === login && user.password === password) {
          console.log(user)
          return user;
        }
      });
    } catch (err) {
      throw err;
    }
  }
}
