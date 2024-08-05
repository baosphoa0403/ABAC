import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import {
  PermissionRequestDto,
  UpdatePermissionRequestDto,
} from 'src/permission/dto/permission.request.dto';
import { CreatePolicyRequest } from 'src/permission/dto/policy.request.dto';
import { PermissionService } from 'src/permission/permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post()
  createPermission(@Body() dto: PermissionRequestDto) {
    return this.permissionService.createPermission(dto);
  }

  @Put(':id')
  updateActionPermission(
    @Body() dto: UpdatePermissionRequestDto,
    @Param('id') id: string,
  ) {
    return this.permissionService.updateActionPermission(dto, id);
  }

  @Delete(':id')
  deletePermission(@Param('id') id: string) {
    return this.permissionService.delete(id);
  }

  @Post('policy')
  async createPolicy(
    @Body()
    policyData: CreatePolicyRequest,
  ) {
    return await this.permissionService.createPolicy(policyData);
  }
}
