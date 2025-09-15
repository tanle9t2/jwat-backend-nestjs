import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Empty, InverterListResponse } from 'src/app/grpc/generated/inverter';

import { status } from '@grpc/grpc-js';
import { AuthRequset, AuthResponse } from '../grpc/generated/auth';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'validateUser')
  async validateUser(request: AuthRequset): Promise<AuthResponse> {
    const { username, password } = request;
    const data = await this.authService.validateUser(username, password);

    return data;
  }
}
