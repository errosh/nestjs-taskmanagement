import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${process.env.NODE_ENV}.env` });
async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port);
  logger.log(`Applcation is running on port :${port} `);
}
bootstrap();
