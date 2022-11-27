import type { AWS } from '@serverless/typescript';

import * as functions from '@functions/index';
import resources from '@resources/index';

const serverlessConfiguration: AWS = {
  service: 'passvault-server',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    versionFunctions: false,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    httpApi: {
      cors: true,
      authorizers: {
        CognitoAuthorizer: {
          type: 'jwt',
          name: 'CognitoAuthorizer',
          identitySource: '$request.header.Authorization',
          issuerUrl: {
            'Fn::Join': [
              '',
              [
                'https://cognito-idp.',
                '${aws:region}',
                '.amazonaws.com/',
                {
                  Ref: 'UserPool',
                },
              ],
            ],
          },
          audience: [
            {
              Ref: 'UserPoolClient',
            },
          ],
        },
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      USER_POOL_ID: { Ref: 'UserPool' },
      USER_POOL_CLIENT_ID: { Ref: 'UserPoolClient' },
      DYNAMO_TABLE_NAME: '${self:custom.dynamoTableName}',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'cognito-idp:AdminInitiateAuth',
          'cognito-idp:AdminCreateUser',
          'cognito-idp:AdminSetUserPassword',
          'cognito-idp:AdminDeleteUser',
        ],
        Resource: {
          'Fn::GetAtt': ['UserPool', 'Arn'],
        },
      },
      {
        Effect: 'Allow',
        Action: ['dynamodb:*'],
        Resource: {
          'Fn::GetAtt': ['PassvaultTable', 'Arn'],
        },
      },
    ],
  },
  // import the function via paths
  functions,
  resources,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: ['es2020'],
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamoTableName: 'passvault',
  },
};

module.exports = serverlessConfiguration;
