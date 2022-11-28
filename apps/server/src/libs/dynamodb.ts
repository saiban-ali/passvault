import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import * as moment from 'moment';

type PutItem<ModelType, PartitionKey extends string, SortKey extends string> = {
  [sk in SortKey]: string;
} & Partial<Omit<ModelType, PartitionKey | SortKey>>;

type DynamoModelType<PartitionKey extends string, SortKey extends string> = {
  [pk in PartitionKey | SortKey]: string;
};

enum DynamoReturnValue {
  ALL_OLD = 'ALL_OLD',
  ALL_NEW = 'ALL_NEW',
  NONE = 'NONE',
  UPDATED_OLD = 'UPDATED_OLD',
  UPDATED_NEW = 'UPDATED_NEW',
}

class DynamoModel<
  ModelType,
  PartitionKey extends string,
  SortKey extends string
> {
  private readonly partition: string;
  private readonly tableName: string;
  private readonly partitionKey: PartitionKey;
  private readonly sortKey: SortKey | null = null;
  private readonly client: DynamoDBClient;

  constructor(
    client: DynamoDBClient,
    partitionKey: PartitionKey,
    sortKey: SortKey,
    tableName: string,
    partition: string
  ) {
    this.partition = partition;
    this.tableName = tableName;
    this.partitionKey = partitionKey;
    this.sortKey = sortKey;
    this.client = client;
  }

  async get(sortKey: string): Promise<ModelType> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: marshall({
        [this.partitionKey]: this.partition,
        [this.sortKey]: sortKey,
      }),
    });

    const res = await this.client.send(command);
    return unmarshall(res.Item) as ModelType;
  }

  async put(data: PutItem<ModelType, PartitionKey, SortKey>): Promise<void> {
    const timestamp = moment.utc().format();
    const item = {
      createdAt: timestamp,
      updatedAt: timestamp,
      ...data,
      [this.partitionKey]: this.partition,
    } as ModelType;
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(item),
    });

    await this.client.send(command);
  }
}

export class DynamoDB<PartitionKey extends string, SortKey extends string> {
  private readonly tableName: string;
  private readonly partitionKey: PartitionKey;
  private readonly sortKey: SortKey | null = null;
  private readonly client: DynamoDBClient;

  constructor(
    tableName: string,
    partitionKey: PartitionKey,
    sortKey: SortKey = null
  ) {
    this.tableName = tableName;
    this.partitionKey = partitionKey;
    this.sortKey = sortKey;
    this.client = new DynamoDBClient({ region: 'us-east-1' });
  }

  model<ModelType extends DynamoModelType<PartitionKey, SortKey>>(
    partition: string
  ) {
    return new DynamoModel<ModelType, PartitionKey, SortKey>(
      this.client,
      this.partitionKey,
      this.sortKey,
      this.tableName,
      partition
    );
  }
}
