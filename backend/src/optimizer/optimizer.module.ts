import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { OptimizerService } from './optimizer.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [OptimizerService],
  exports: [OptimizerService],
})
export class OptimizerModule {}
