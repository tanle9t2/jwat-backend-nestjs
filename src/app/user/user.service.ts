import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { NotFoundException } from '@nestjs/common';
import { UserSignUpRequest } from '../grpc/generated/user';
import { User } from './user.entity';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import * as bcrypt from 'bcrypt';

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Not found user',
      });
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Not found user',
      });
    }
    return user;
  }

  async save(user: UserSignUpRequest): Promise<User> {
    const entity = this.userRepository.create(user);
    entity.createdAt = new Date();

    const saltRounds = 10;
    entity.password = await bcrypt.hash(user.password, saltRounds);

    return await this.userRepository.save(entity);
  }
}
