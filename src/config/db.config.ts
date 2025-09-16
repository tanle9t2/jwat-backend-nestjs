import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';
import { Inverter } from 'src/modules/inverter/inverter.entity';
import { User } from 'src/modules/user/user.entity';

export const getTypeOrmConfig = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get<string>('DB_HOST'),
  port: config.get<number>('DB_PORT'),
  username: config.get<string>('DB_USER'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get<string>('DB_NAME'),
  entities: [Inverter, User],
  synchronize: true,
});
