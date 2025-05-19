import { Module } from '@nestjs/common';
import { AttachementsController } from './attachements.controller';
import { AttachementsService } from './attachements.service';

@Module({
  controllers: [AttachementsController],
  providers: [AttachementsService]
})
export class AttachementsModule {}
