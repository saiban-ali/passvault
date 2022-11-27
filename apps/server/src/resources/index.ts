import cognito from './cognito';
import dynamodb from './dynamodb';

export default {
  Resources: {
    ...cognito,
    ...dynamodb,
  },
};
