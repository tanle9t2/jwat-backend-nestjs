import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Inverter } from 'src/app/inverter/inverter.entity';
import { User } from '../user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '090224T@n',
  database: 'postgres',
  entities: [Inverter, User],
  synchronize: true,
};
