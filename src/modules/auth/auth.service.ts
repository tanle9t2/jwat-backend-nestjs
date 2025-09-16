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

import { AuthResponse, RefreshTokenRequet } from '../../grpc/generated/auth';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ACCESS_TOKEN_EXPIRED,
  REFRESH_TOKEN_EXPIRED,
} from '../../utils/constant';
import { User } from '../user/user.entity';

interface PayloadJwt {
  sub: number;
  username: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
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
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const { accessToken, refreshToken } = this.registerToken(payload);

    return { accessToken, refreshToken };
  }

  registerToken(payload: PayloadJwt) {
    const secret = this.config.get('JWT_SECRET');
    const keyBytes = Buffer.from(secret, 'base64url');

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: ACCESS_TOKEN_EXPIRED,
      secret: keyBytes,
      algorithm: 'HS256',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: REFRESH_TOKEN_EXPIRED,
      secret: keyBytes,
    });

    return { accessToken, refreshToken };
  }

  async getTokens(request: RefreshTokenRequet) {
    const secret = this.config.get('JWT_SECRET');
    const keyBytes = Buffer.from(secret, 'base64url');

    const accessToken = this.jwtService.sign(
      { ...request },
      {
        expiresIn: ACCESS_TOKEN_EXPIRED,
        secret: keyBytes,
        algorithm: 'HS256',
      },
    );

    return { accessToken };
  }
}
