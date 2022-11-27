import {
  ApiRequest,
  AuthorizedRequest,
  LocalStorage,
} from '@passvault/shared-services';
import { AuthSession, User } from '@passvault/shared-types';

class AuthModel {
  private readonly endpoint: string = '/auth';
  private readonly apiRequest = new ApiRequest();
  private readonly authorizedRequest = new AuthorizedRequest();

  async login(email: string, password: string) {
    const res = await this.apiRequest.post<AuthSession>(
      `${this.endpoint}/login`,
      {
        email,
        password,
      }
    );

    LocalStorage.set('token', res.data);
    return res;
  }

  async signup(email: string, password: string, name: string) {
    const res = await this.apiRequest.post<AuthSession>(
      `${this.endpoint}/signup`,
      {
        email,
        password,
        name,
      }
    );

    LocalStorage.set('auth', res.data);
    return res;
  }

  async getUser() {
    const res = await this.authorizedRequest.get<User>(`${this.endpoint}/user`);

    LocalStorage.set('user', res.data);
    return res;
  }
}

export const Auth = new AuthModel();
