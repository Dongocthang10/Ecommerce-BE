import { registerAs } from "@nestjs/config";
import { parseEnvOrigins } from "../../shared/utils/parse-env-origins.js";

export const APP_CONFIG = 'app';

export default registerAs(APP_CONFIG, () => ({
    port: parseInt(process.env.PORT ?? '8080', 10),
    corsOrigins: parseEnvOrigins(
        process.env.CLIENT_URL,
        process.env.CORS_OTHER_URL
    )
}))