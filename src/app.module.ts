import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { InverterResolver } from './inverter/inverter.resolver';
import { InverterService } from './inverter/inverter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inverter } from './inverter/inverter.entity';
import { typeOrmConfig } from './utils/db.config';
import { InverterModule } from './inverter/inverter.module';

@Module({
  imports: [ GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: "src/graphql/scheme.gql"
  }), 
  TypeOrmModule.forRoot(typeOrmConfig),
  InverterModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
