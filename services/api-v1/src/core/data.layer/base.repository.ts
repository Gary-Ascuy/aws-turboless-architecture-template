import { injectable } from "inversify";

import { ModelType } from "dynamoose/dist/General";
import { Item } from "dynamoose/dist/Item";

import { IQuery } from "./entities/query.entity";

@injectable()
export abstract class IBaseRepository<T> {
  abstract readonly table: string;
  abstract readonly partitionKey: string;

  abstract readonly model: ModelType<Item>;

  // Query
  async getAll(_query: IQuery): Promise<T[]> {
    // TODO: Implement DynamoDB adaptaers to allow IQuery (Projection/Pagination/Filters/...)
    const items = await this.model.scan().exec();
    return items.toJSON() as T[];
  }

  async getBy(id: string, _query: IQuery): Promise<T> {
    // TODO: Implement DynamoDB adaptaers to allow IQuery (Projection)
    const item = await this.model.get(id);
    return item.toJSON() as T;
  }

  // Mutation
  async create(data: T, _query: IQuery): Promise<T> {
    // TODO: Implement DynamoDB adaptaers to allow IQuery (Projection)
    const item = await this.model.create(data as Item);
    return item.toJSON() as T;
  }

  async update(id: string, data: Partial<T>, _query: IQuery): Promise<T> {
    // TODO: Implement DynamoDB adaptaers to allow IQuery (Projection)
    const item = await this.model.update(id, data);
    return item.toJSON() as T;
  }

  async delete(id: string, _query: IQuery): Promise<T> {
    // TODO: Implement DynamoDB adaptaers to allow IQuery (Projection)
    const item = await this.model.get(id);
    await item.delete();
    return item.toJSON() as T;
  }
}
