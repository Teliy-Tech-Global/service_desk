import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';

// Modules
import { AgentsModule } from './agents/agents.module';
import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { CommentsModule } from './comments/comments.module';
import { AttachmentsModule } from './attachments/attachments.module';

// Guards and Serializers
import { RolesGuard } from './auth/roles/roles.guard';
import { SessionSerializer } from './auth/session.serializer';

@Module({
  imports: [
    // Load env variables globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Async TypeORM config with glob pattern for entities
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // THIS IS ONLY FOR DEVELOPMENT, DO NOT USE IN PRODUCTION
      }),
    }),

    // All THE APP MODULES
    AgentsModule,
    KnowledgeBaseModule,
    ReportsModule,
    UsersModule,
    AuthModule,
    TicketsModule,
    CommentsModule,
    AttachmentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SessionSerializer,
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // apply globally
    },
  ],
})
export class AppModule {}
