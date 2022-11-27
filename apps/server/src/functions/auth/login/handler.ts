import {
  ApiResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/api-gateway';
import { Cognito } from '@libs/cognito';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const signup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { email, password } = event.body;

  const authData = await Cognito.authenticate(email, password);

  return ApiResponse.created({
    message: 'Login successful',
    data: { IdToken: authData.IdToken, ExpiresIn: authData.ExpiresIn },
  });
};

export const main = middyfy(signup);
