import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { DATABASE_CONFIG } from "./database.config.js";
import {SnakeNamingStrategy} from 'typeorm-naming-strategies'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly config: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        const dbConfig = this.config.getOrThrow<TypeOrmModuleOptions>(DATABASE_CONFIG);

        return {
            ...dbConfig,
            autoLoadEntities: true,
            synchronize: false,
            logging: ['error'],
            migrationsRun: false,
            retryAttempts: 5,
            retryDelay: 3000,
            namingStrategy: new SnakeNamingStrategy()
        }
    }
}