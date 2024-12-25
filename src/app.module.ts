import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.IBISI_HOST,
      port: parseInt(process.env.IBISI_PORT, 10) || 5432,
      username: process.env.IBISI_USER,
      password: process.env.IBISI_PASSWORD,
      database: process.env.IBISI_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),

    RolesModule,

    UsersModule,

    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
