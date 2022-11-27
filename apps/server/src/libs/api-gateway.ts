import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema, JSONSchema } from 'json-schema-to-ts';

const defaultSchema: JSONSchema = {};
type DefaultSchemaType = typeof defaultSchema;

export type ValidatedAPIGatewayProxyEvent<
  S extends JSONSchema = DefaultSchemaType
> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
  user?: { email?: string; username?: string };
};
export type ValidatedEventAPIGatewayProxyEvent<
  S extends JSONSchema = DefaultSchemaType
> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>;

export class ApiResponse {
  statusCode: number;
  body: string;
  headers: Record<string, string>;
  constructor(
    statusCode: number,
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ) {
    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
    this.headers = { 'Content-Type': 'application/json', ...headers };
  }

  static ok(body: Record<string, unknown>, headers?: Record<string, string>) {
    return new ApiResponse(200, body, headers);
  }

  static created(
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ) {
    return new ApiResponse(201, body, headers);
  }

  static badRequest(
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ) {
    return new ApiResponse(400, body, headers);
  }

  static unauthorized(
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ) {
    return new ApiResponse(401, body, headers);
  }

  static forbidden(
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ) {
    return new ApiResponse(403, body, headers);
  }

  static notFound(
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ) {
    return new ApiResponse(404, body, headers);
  }

  static conflict(
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ) {
    return new ApiResponse(409, body, headers);
  }

  static internalServerError(
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ) {
    return new ApiResponse(500, body, headers);
  }
}
