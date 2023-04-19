import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

export type ServerlessEvent<S extends object = { type: "null" }> = Omit<
  APIGatewayProxyEvent,
  "body"
> & { body: FromSchema<S> };

export type ServerlessFunction<S extends object = { type: "null" }> = Handler<
  ServerlessEvent<S>,
  APIGatewayProxyResult
>;

export type GirisResponse = Record<string, unknown> | unknown | unknown[];
