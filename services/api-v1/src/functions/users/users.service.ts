import { inject, injectable } from "inversify";

import { IQuery } from "src/core/data.layer";
import { IUserEntity } from "./entities/user.entity";
import { IUserRepository } from "./users.repository";
import { types } from "@config/types";

export interface IUserService {
  getAll(query: IQuery): Promise<IUserEntity[]>;
  getBy(id: string, query: IQuery): Promise<IUserEntity>;

  create(data: IUserEntity, query: IQuery): Promise<IUserEntity>;
  update(id: string, data: IUserEntity, query: IQuery): Promise<IUserEntity>;
  delete(id: string, query: IQuery): Promise<IUserEntity>;
}

@injectable()
export class UserService implements IUserService {
  constructor(@inject(types.IUserRepository) private readonly users: IUserRepository) {}

  async getAll(query: IQuery): Promise<IUserEntity[]> {
    // TODO: Add validations
    return this.users.getAll(query);
  }

  async getBy(id: string, query: IQuery): Promise<IUserEntity> {
    // TODO: Add validations
    return this.users.getBy(id, query);
  }

  async create(data: IUserEntity, query: IQuery): Promise<IUserEntity> {
    // TODO: Add validations
    return this.users.create(data, query);
  }

  async update(id: string, data: IUserEntity, query: IQuery): Promise<IUserEntity> {
    // TODO: Add validations
    return this.users.update(id, data, query);
  }

  async delete(id: string, query: IQuery): Promise<IUserEntity> {
    // TODO: Add validations
    return this.users.delete(id, query);
  }
}
