"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const agents_module_1 = require("./agents/agents.module");
const knowledge_base_module_1 = require("./knowledge-base/knowledge-base.module");
const categories_module_1 = require("./categories/categories.module");
const reports_module_1 = require("./reports/reports.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const tickets_module_1 = require("./tickets/tickets.module");
const comments_module_1 = require("./comments/comments.module");
const attachements_module_1 = require("./attachements/attachements.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '5432', 10),
                username: process.env.DB_USERNAME || 'postgres',
                password: process.env.DB_PASSWORD || 'postgres',
                database: process.env.DB_NAME || 'service_desk',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            agents_module_1.AgentsModule,
            knowledge_base_module_1.KnowledgeBaseModule,
            categories_module_1.CategoriesModule,
            reports_module_1.ReportsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            tickets_module_1.TicketsModule,
            comments_module_1.CommentsModule,
            attachements_module_1.AttachementsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map