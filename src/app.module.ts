import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentsModule } from './agents/agents.module';
import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module';
import { CategoriesModule } from './categories/categories.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { CommentsModule } from './comments/comments.module';
import { AttachementsModule } from './attachements/attachements.module';

@Module({
  imports: [AgentsModule, KnowledgeBaseModule, CategoriesModule, ReportsModule, UsersModule, AuthModule, TicketsModule, CommentsModule, AttachementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
