"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Service Desk API')
        .setDescription('API documentation for the Service Desk project')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
}
bootstrap();
//# sourceMappingURL=main.js.map