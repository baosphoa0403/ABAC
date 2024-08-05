import { Action, Resource } from 'src/enum/enum';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { PickType } from '@nestjs/swagger';
export class PermissionRequestDto {
  @IsArray()
  @IsNotEmpty()
  userIds: string[];

  @IsArray()
  @IsEnum(Action, { each: true })
  actions: Action;

  @IsNotEmpty()
  @IsEnum(Resource)
  resource: Resource;
}

export class UpdatePermissionRequestDto extends PickType(PermissionRequestDto, [
  'actions',
]) {}
