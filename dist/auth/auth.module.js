"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const oauth_strategy_1 = require("./strategies/oauth.strategy");
const session_serializer_1 = require("./session.serializer");
const users_module_1 = require("../users/users.module");
const user_entity_1 = require("../users/entities/user.entity");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ session: true }),
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, oauth_strategy_1.OAuth2Strategy, session_serializer_1.SessionSerializer],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map