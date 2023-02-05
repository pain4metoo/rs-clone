import { UserData } from '../common/state-types';
import { baseUrl, path } from './routes';

export class AuthController {
  public static async isAuthUser(login: string, password: string): Promise<boolean | void> {
    try {
      const response: Response = await fetch(`${baseUrl}${path.users}`);
      const users: Array<UserData> = await response.json();
      return users.every((user: UserData): boolean => user.email === login && user.password === password);
    } catch (err) {
      throw err;
    }
  }
}
