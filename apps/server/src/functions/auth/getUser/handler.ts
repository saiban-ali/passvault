import { Users } from '@db/index';
import {
  ApiResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const getUser: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  const username = event.user.username;

  if (!username) {
    return ApiResponse.internalServerError({
      message: 'Could not get username',
    });
  }

  const user = await Users.get(username);

  return ApiResponse.created({
    message: 'Successful',
    data: user,
  });
};

export const main = middyfy(getUser);
