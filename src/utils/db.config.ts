import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Inverter } from 'src/inverter/inverter.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', 
  host: 'localhost',
  port: 5432,      
  username: 'postgres',
  password: '090224T@n',
  database: 'postgres',
  entities: [Inverter],
  synchronize: true, // auto-create tables in dev
};