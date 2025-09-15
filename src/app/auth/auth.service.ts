import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { User } from '../user/user.entity';
import { AuthResponse } from '../grpc/generated/auth';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<AuthResponse> {
    const user = await this.authRepository.findOne({ where: { username } });
    if (!user) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: 'Invalid credentials',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: 'Username/Password invalid',
      });
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }
}
