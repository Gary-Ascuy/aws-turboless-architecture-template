import { GirisResponse } from "./interfaces";

export const ok = (response: GirisResponse) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const notFound = (response: GirisResponse) => {
  return {
    statusCode: 404,
    body: JSON.stringify(response),
  };
};

export const internalError = (response: GirisResponse) => {
  return {
    statusCode: 500,
    body: JSON.stringify(response),
  };
};
