import { Module } from '@nestjs/common';
import { TypeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmConfig, TasksModule, AuthModule],
})
export class AppModule {}
