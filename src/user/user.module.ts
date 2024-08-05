import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from 'src/database/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from 'src/database/entities/role.entity';
import { PermissionSchema } from 'src/database/entities/permission';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
  imports: [
    PermissionModule,
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema },
      { name: 'role', schema: RoleSchema },
      { name: 'permission', schema: PermissionSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
