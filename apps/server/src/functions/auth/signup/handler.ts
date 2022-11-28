import { Users } from '@db/index';
import {
  ApiResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/api-gateway';
import { Cognito } from '@libs/cognito';
import { middyfy } from '@libs/lambda';
import * as httpErrors from 'http-errors';

import schema from './schema';

const signup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { name, email, password } = event.body;
  const user = await Cognito.createUser({
    email,
    password,
    name,
  });

  try {
    await Users.put({
      slug: user.Username,
      name,
      email,
    });

    const authData = await Cognito.authenticate(email, password);

    return ApiResponse.created({
      message: `User registration successful`,
      data: { IdToken: authData.IdToken, ExpiresIn: authData.ExpiresIn },
    });
  } catch (err) {
    await Cognito.deleteUser(email);
    throw new httpErrors.InternalServerError(err.message);
  }
};

export const main = middyfy(signup);
