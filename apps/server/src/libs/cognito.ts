import {
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminInitiateAuthCommand,
  AdminSetUserPasswordCommand,
  AuthFlowType,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';

type CreateUser = { name?: string; email: string; password: string };

export class Cognito {
  private static cognito = new CognitoIdentityProviderClient({
    region: 'us-east-1',
  });
  private static userPoolId = process.env.USER_POOL_ID;
  private static clientId = process.env.USER_POOL_CLIENT_ID;
  private static authFlow = AuthFlowType.ADMIN_NO_SRP_AUTH;

  static async createUser(user: CreateUser) {
    const userRes = await this.cognito.send(
      new AdminCreateUserCommand({
        UserPoolId: this.userPoolId,
        Username: user.email,
        UserAttributes: [
          {
            Name: 'email',
            Value: user.email,
          },
          {
            Name: 'name',
            Value: user.name,
          },
          {
            Name: 'email_verified',
            Value: 'true',
          },
        ],
        MessageAction: 'SUPPRESS',
      })
    );

    if (!userRes.User) {
      throw new Error(`Could not create user: ${user.name}`);
    }

    try {
      await this.cognito.send(
        new AdminSetUserPasswordCommand({
          UserPoolId: process.env.USER_POOL_ID,
          Username: user.email,
          Password: user.password,
          Permanent: true,
        })
      );
    } catch (err) {
      await this.deleteUser(user.email);
      throw err;
    }

    return userRes.User;
  }

  static async deleteUser(email: string) {
    await this.cognito.send(
      new AdminDeleteUserCommand({
        UserPoolId: this.userPoolId,
        Username: email,
      })
    );
  }

  static async authenticate(email: string, password: string) {
    const authRes = await this.cognito.send(
      new AdminInitiateAuthCommand({
        UserPoolId: this.userPoolId,
        ClientId: this.clientId,
        AuthFlow: this.authFlow,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })
    );

    return authRes.AuthenticationResult;
  }
}
