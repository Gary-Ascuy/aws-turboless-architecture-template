import { middyfy, ok, ServerlessFunction } from "core-functions";

import { container } from "@config/ioc.config";
import { getQuery } from "@core/controller.layer";
import { config } from "./api.configuration";
import CreateDto from "./dto/create.dto.schema";
import UpdateDto from "./dto/update.dto.schema";

import { IUserService } from "./users.service";
import { IUserEntity } from "./entities/user.entity";
import { types } from "@config/types";

const fnGetAll: ServerlessFunction = async (event, _context) => {
  const service = container.get<IUserService>(types.IUserService);

  const items = await service.getAll(getQuery(event, config));
  return ok(items);
};

const fnGetBy: ServerlessFunction = async (event, _context) => {
  const service = container.get<IUserService>(types.IUserService);

  const id = event.pathParameters?.id as string;
  const item = await service.getBy(id, getQuery(event, config));
  return ok(item);
};

const fnCreate: ServerlessFunction<typeof CreateDto> = async (event, _context) => {
  const service = container.get<IUserService>(types.IUserService);

  const item = await service.create(event.body as IUserEntity, getQuery(event, config));
  return ok(item);
};

const fnUpdate: ServerlessFunction<typeof UpdateDto> = async (event, _context) => {
  const service = container.get<IUserService>(types.IUserService);

  const id = event.pathParameters?.id as string;
  const item = await service.update(id, event.body as IUserEntity, getQuery(event, config));
  return ok(item);
};

const fnRemove: ServerlessFunction = async (event, _context) => {
  const service = container.get<IUserService>(types.IUserService);

  const id = event.pathParameters?.id as string;
  const item = await service.delete(id, getQuery(event, config));
  return ok(item);
};

// Query
export const getAll = middyfy(fnGetAll);
export const getBy = middyfy(fnGetBy);

// Mutation
export const create = middyfy(fnCreate);
export const update = middyfy(fnUpdate);
export const remove = middyfy(fnRemove);
