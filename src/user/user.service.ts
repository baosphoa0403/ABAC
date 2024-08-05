import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleEntity } from 'src/database/entities/role.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserInfo } from 'src/decorator/decorator';
import { Role } from 'src/enum/enum';
import { PermissionService } from 'src/permission/permission.service';

@Injectable()
export class UserService {
  private readonly userData = [
    {
      name: 'doctor',
      fullName: 'nguyễn văn A',
      username: 'doctor',
      password: '123',
      department: 'Phòng Khám Nội Khoa',
      employmentStatus: 'Full-time',
      role: Role.Doctor,
    },
    {
      name: 'nurse',
      fullName: 'nguyễn văn Y tá 1',
      username: 'doctor',
      password: '123',
      department: 'Y Tá Phòng Khám Nội Khoa',
      employmentStatus: 'Full-time',
      role: Role.Nurse,
    },
    {
      name: 'nurse',
      fullName: 'nguyễn văn Y tá 2',
      username: 'doctor',
      password: '123',
      department: 'Y Tá Phòng Khám Nội Khoa',
      employmentStatus: 'Part-time',
      role: Role.Nurse,
    },
    {
      name: 'admin',
      fullName: 'nguyễn văn C ',
      username: 'doctor',
      password: '123',
      department: 'Phòng IT',
      employmentStatus: 'Full-time',
      role: Role.Admin,
    },
    {
      name: 'patient',
      fullName: 'nguyễn văn D',
      username: 'doctor',
      password: '123',
      department: null,
      employmentStatus: null,
      role: Role.Patient,
    },
  ];

  private readonly roles = [
    {
      name: Role.Admin,
    },
    {
      name: Role.Doctor,
    },
    {
      name: Role.Nurse,
    },
    {
      name: Role.Patient,
    },
  ];

  constructor(
    @InjectModel('user') private userModel: Model<UserEntity>,
    @InjectModel('role') private roleModel: Model<RoleEntity>,
    private permissionService: PermissionService,
  ) {
    // this.insertData();
  }

  async getUser() {
    return await this.userModel.find({});
  }

  findOne(username: string) {
    return this.userModel.findOne({ username: username }).lean();
  }

  async findById(id: string): Promise<UserInfo> {
    const user = (await this.userModel
      .findById({ _id: id })
      .populate('role', 'name')
      .lean()) as UserInfo;
    const permissions = await this.permissionService.getPermissionByUserId(id);

    return { ...user, permissions: permissions };
  }

  async insertData() {
    // await this.roleModel.create(this.roles);
    const roles = await this.roleModel.find({}).lean();
    const dataMapping = this.userData.map((item) => {
      return new this.userModel({
        ...item,
        role: roles.find((e) => {
          return e.name === item.role;
        })._id,
      });
    });

    const res = this.userModel.bulkSave(dataMapping);
  }
}
