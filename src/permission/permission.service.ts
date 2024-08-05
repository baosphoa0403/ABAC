import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PermissionEntity } from 'src/database/entities/permission';
import { PolicyEntity } from 'src/database/entities/policy';
import { Permission } from 'src/decorator/decorator';
import { Resource, Role } from 'src/enum/enum';
import {
  PermissionRequestDto,
  UpdatePermissionRequestDto,
} from 'src/permission/dto/permission.request.dto';
import { CreatePolicyRequest } from 'src/permission/dto/policy.request.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel('permission') private permissionModel: Model<PermissionEntity>,
    @InjectModel('policy') private policyModel: Model<PolicyEntity>,
  ) {
    // const currentDateTime = new Date().toISOString();
    // const formattedTime = moment(currentDateTime).format('HH');
    // console.log(formattedTime);
  }

  async getPolicyByResource(resource: Resource): Promise<PolicyEntity> {
    return await this.policyModel
      .findOne({
        resource: resource,
      })
      .lean();
  }

  async createPermission({ actions, resource, userIds }: PermissionRequestDto) {
    const existingPermissions = await this.permissionModel.find({
      user: {
        $in: userIds.map((e) => {
          return new Types.ObjectId(e);
        }),
      },
      resource,
    });

    if (existingPermissions.length > 0) {
      throw new BadRequestException('Duplicate permissions found');
    }

    const dataCreate = userIds.map((userId) => {
      return new this.permissionModel({
        user: new Types.ObjectId(userId),
        actions: actions,
        resource,
        createdAt: new Date(),
      });
    });

    const permissions = await this.permissionModel.bulkSave(dataCreate);

    return permissions;
  }

  async updateActionPermission(dto: UpdatePermissionRequestDto, id: string) {
    const permission = await this.permissionModel
      .findOne({ _id: new Types.ObjectId(id) })
      .lean();

    if (!permission) {
      throw new BadRequestException('not found permission');
    }

    await this.permissionModel.updateOne(
      {
        _id: new Types.ObjectId(id),
      },
      {
        actions: dto.actions,
        updatedAt: new Date(),
      },
    );
  }

  async delete(id: string) {
    await this.permissionModel.deleteOne({ _id: new Types.ObjectId(id) });
  }

  async createPolicy(policyData: CreatePolicyRequest) {
    const newPolicy = new this.policyModel({ ...policyData });

    return await this.policyModel.bulkSave([newPolicy]);
  }

  async getPermissionByUserId(idUser: string): Promise<Permission[]> {
    const permission = (await this.permissionModel
      .find({
        user: new Types.ObjectId(idUser),
      })
      .select('actions resource')
      .lean()) as Permission[];

    return permission;
  }
}
