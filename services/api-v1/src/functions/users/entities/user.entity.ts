import { IBaseEntity } from "src/core/data.layer";

export interface IUserEntity extends IBaseEntity {
  id: string;
  name: string;
}
