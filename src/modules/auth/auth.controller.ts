import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';

import { status } from '@grpc/grpc-js';
import {
  AuthRequset,
  AuthResponse,
  RefreshTokenRequet,
  RefreshTokenResponse,
} from '../../grpc/generated/auth';
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
  @GrpcMethod('AuthService', 'getToken')
  async getToken(request: RefreshTokenRequet): Promise<RefreshTokenResponse> {
    const { accessToken } = await this.authService.getTokens(request);

    return { accessToken };
  }
}
