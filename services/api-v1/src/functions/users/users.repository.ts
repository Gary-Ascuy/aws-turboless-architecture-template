import dynamoose from "dynamoose";
import type { ModelType } from "dynamoose/dist/General";
import type { Item } from "dynamoose/dist/Item";
import { inject, injectable } from "inversify";

import { IBaseRepository } from "@core/data.layer";
import { types } from "@config/types";

import { IUserEntity } from "./entities/user.entity";
import { IConfigService } from "@config/config.server";

export const UserSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    name: {
      type: String,
    },
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

@injectable()
export abstract class IUserRepository extends IBaseRepository<IUserEntity> {}

@injectable()
export class UserRepository extends IUserRepository {
  readonly table: string;
  readonly partitionKey: string = "id";

  readonly model: ModelType<Item>;

  constructor(@inject(types.IConfigService) private readonly config: IConfigService) {
    super();

    this.table = this.config.getTableName("users");
    this.model = dynamoose.model(this.table, UserSchema);
  }
}
