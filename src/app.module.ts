import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/AuthGuard';
import { DatabaseModule } from 'src/database/database.module';
import { PermissionModule } from 'src/permission/permission.module';
import { PatientRecordModule } from 'src/patientRecord/patientRecord.module';
import { PolicyGuard } from 'src/guard/PolicyGuard';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    PermissionModule,
    PatientRecordModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PolicyGuard,
    },
  ],
})
export class AppModule {}
