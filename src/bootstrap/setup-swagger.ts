import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";

export function setupSwagger(app: NestExpressApplication): void {
    const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce APIs')
    .setVersion('1.0')
    .build()

    const document = SwaggerModule.createDocument(app, swaggerConfig)

    SwaggerModule.setup('docs', app, document);
}