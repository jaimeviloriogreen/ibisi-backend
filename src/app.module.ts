import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/gards/auth.gard";
import { RoleGuard } from "./roles/gards/roles.gard";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { TeachersModule } from "./teachers/teachers.module";
import { StudentsModule } from "./students/students.module";
import { AdminModule } from "./admin/admin.module";
import { SubjectsModule } from './subjects/subjects.module';
import { GradesModule } from './grades/grades.module';
import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: "postgres",
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
    AuthModule,
    TeachersModule,
    StudentsModule,
    AdminModule,
    SubjectsModule,
    GradesModule,
    ClassesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
