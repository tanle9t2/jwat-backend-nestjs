import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  Empty,
  InverterListResponse,
  InvertersRequest,
} from 'src/grpc/generated/inverter';
import { InverterService } from './inverter.service';

@Controller()
export class InverterController {
  constructor(private readonly inverterService: InverterService) {}

  @GrpcMethod('InverterService', 'FindAll')
  async findAll(request: InvertersRequest): Promise<InverterListResponse> {
    const data = await this.inverterService.findAll(request);

    return data;
  }
}
