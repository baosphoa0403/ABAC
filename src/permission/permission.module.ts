import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionSchema } from 'src/database/entities/permission';
import { PolicySchema } from 'src/database/entities/policy';
import { PermissionController } from 'src/permission/permission.controller';
import { PermissionService } from 'src/permission/permission.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'permission', schema: PermissionSchema },
      { name: 'policy', schema: PolicySchema },
    ]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
