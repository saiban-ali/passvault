export default {
  PassvaultTable: {
    Type: 'AWS::DynamoDB::Table',
    DeletionPolicy: 'Retain',
    UpdateReplacePolicy: 'Retain',
    Properties: {
      TableName: '${self:custom.dynamoTableName}',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'slug',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'slug',
          KeyType: 'RANGE',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    },
  },
};
