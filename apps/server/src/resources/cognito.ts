export default {
  UserPool: {
    Type: 'AWS::Cognito::UserPool',
    Properties: {
      UserPoolName: 'passvault-user-pool',
      UsernameAttributes: ['email'],
      Schema: [
        {
          Name: 'email',
          Required: true,
          Mutable: false,
        },
        {
          Name: 'name',
          Required: true,
          Mutable: true,
        },
      ],
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8,
          RequireLowercase: true,
          RequireNumbers: true,
          RequireSymbols: true,
          RequireUppercase: true,
        },
      },
      AutoVerifiedAttributes: ['email'],
    },
  },
  UserPoolClient: {
    Type: 'AWS::Cognito::UserPoolClient',
    Properties: {
      ClientName: 'passvault-user-pool-client',
      UserPoolId: { Ref: 'UserPool' },
      GenerateSecret: false,
      AccessTokenValidity: 10,
      IdTokenValidity: 10,
      ExplicitAuthFlows: ['ADMIN_NO_SRP_AUTH'],
    },
  },
};
