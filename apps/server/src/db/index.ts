import { DynamoDB } from '@libs/dynamodb';
import type { User } from '@passvault/shared-types';

const tableName = process.env.DYNAMO_TABLE_NAME;

export const db = new DynamoDB(tableName, 'id', 'slug');

export const Users = db.model<User>('users');
