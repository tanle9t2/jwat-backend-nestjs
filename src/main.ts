import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['inverter', 'auth', 'user'],
        protoPath: [
          join(__dirname, '../proto/inverter.proto'),
          join(__dirname, '../proto/user.proto'),
          join(__dirname, '../proto/auth.proto'),
        ],
        url: '0.0.0.0:5001',
      },
    },
  );

  await app.listen();
}
bootstrap();
