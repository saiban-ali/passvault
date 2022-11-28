import middy from '@middy/core';
import middyErrorLogger from '@middy/error-logger';
import cors from '@middy/http-cors';
import middyHttpErrorHandler from '@middy/http-error-handler';
import middyHttpEventNormalizer from '@middy/http-event-normalizer';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import middyInputOutputLogger from '@middy/input-output-logger';
import { APIGatewayProxyResult } from 'aws-lambda';
import { ValidatedAPIGatewayProxyEvent } from './api-gateway';

const authorizerClaimNormalizer = (): middy.MiddlewareObj<
  ValidatedAPIGatewayProxyEvent,
  APIGatewayProxyResult
> => {
  const beforeEvent: middy.MiddlewareFn<
    ValidatedAPIGatewayProxyEvent,
    APIGatewayProxyResult
  > = (request) => {
    const { event } = request;

    event.user = {
      email: event.requestContext.authorizer?.jwt?.claims?.email,
      username:
        event.requestContext.authorizer?.jwt?.claims?.['cognito:username'],
    };
  };

  return {
    before: beforeEvent,
  };
};

export const middyfy = (handler) => {
  return middy(handler)
    .use(
      middyInputOutputLogger({
        logger(message) {
          console.log('before: ' + JSON.stringify(message, null, 2));
        },
      })
    )
    .use(middyHttpEventNormalizer())
    .use(middyJsonBodyParser())
    .use(authorizerClaimNormalizer())
    .use(
      middyInputOutputLogger({
        logger(message) {
          console.log('after: ' + JSON.stringify(message, null, 2));
        },
      })
    )
    .use(middyErrorLogger())
    .use(middyHttpErrorHandler())
    .use(cors());
};
