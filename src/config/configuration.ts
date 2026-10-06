import appConfig from "./app/app.config.js";
import databaseConfig from "./database/database.config.js";
import throttlerConfig from "./throttler/throttler.config.js";

export const cfgLoad = [databaseConfig, appConfig, throttlerConfig ] 