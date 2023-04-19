import { injectable } from "inversify";

export interface IConfigService {
  readonly app: string;
  readonly stage: string;

  getTableName(name: string): string;
}

@injectable()
export class ConfigService implements IConfigService {
  readonly app: string = process.env.APP_PREFIX as string;
  readonly stage: string = process.env.STAGE as string;

  getTableName(name: string): string {
    if (!this.app || this.app.length < 1) {
      throw new Error("APP_PREFIX env var needs to be defined");
    }

    if (!this.stage || this.stage.length < 1) {
      throw new Error("APP_PREFIX env var needs to be defined");
    }

    return `${this.app}_${this.stage}__${name}`;
  }
}
