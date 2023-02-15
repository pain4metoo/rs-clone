import { state } from '../common/state';
import { baseUrl, path } from './routes';

export class SettingsController {
  public static async setSettings(): Promise<void> {
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
    } catch (err) {
      console.log(err);
    }
  }
}
