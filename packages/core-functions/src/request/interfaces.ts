import type { APIGatewayProxyEventMultiValueQueryStringParameters } from "aws-lambda";

export type GirisQuery =
  APIGatewayProxyEventMultiValueQueryStringParameters | null;
