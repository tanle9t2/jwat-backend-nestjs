import { Module } from '@nestjs/common';
import { InverterResolver } from './inverter.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inverter } from './inverter.entity';
import { InverterService } from './inverter.service';
import { InverterController } from './inverter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inverter])],
  controllers: [InverterController],
  providers: [InverterResolver, InverterService],
})
export class InverterModule {}
