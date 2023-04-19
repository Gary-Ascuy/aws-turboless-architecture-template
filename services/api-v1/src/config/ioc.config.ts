import "reflect-metadata";

import { Container } from "inversify";

import { types } from "./types";
import { IConfigService, ConfigService } from "./config.server";
import { IUserService, UserService } from "@functions/users/users.service";
import { IUserRepository, UserRepository } from "@functions/users/users.repository";

export const container = new Container();

container.bind<IConfigService>(types.IConfigService).to(ConfigService);

container.bind<IUserService>(types.IUserService).to(UserService);
container.bind<IUserRepository>(types.IUserRepository).to(UserRepository);
