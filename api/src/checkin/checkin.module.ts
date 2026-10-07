import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CheckinController } from './checkin.controller';
import { CheckinService } from './checkin.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [CheckinController],
  providers: [CheckinService, PrismaService],
})
export class CheckinModule {}
