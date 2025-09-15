import { Controller, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  UserInfoRequest,
  UserInfoResponse,
  UserSignUpRequest,
  UserSignUpRespone,
} from '../grpc/generated/user';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @GrpcMethod('UserService', 'getUserInfo')
  async getUserInfo(request: UserInfoRequest): Promise<UserInfoResponse> {
    const data = await this.userService.findById(request.id);

    return {
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };
  }
  @GrpcMethod('UserService', 'signUpUser')
  async signUpUser(request: UserSignUpRequest): Promise<UserSignUpRespone> {
    const data = await this.userService.save(request);

    return {
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
    };
  }
}
