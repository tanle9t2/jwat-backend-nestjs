import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Empty, InverterListResponse } from 'src/app/grpc/generated/inverter';
import { InverterService } from './inverter.service';

@Controller()
export class InverterController {
  constructor(private readonly inverterService: InverterService) {}

  @GrpcMethod('InverterService', 'FindAll')
  async findAll(request: Empty): Promise<InverterListResponse> {
    const data = await this.inverterService.findAll({ page: 0, size: 5 });

    return data;
  }
}
