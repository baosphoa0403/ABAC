import { IsEnum, IsNotEmpty } from 'class-validator';
import { Environment } from 'src/database/entities/policy';
import { Action, Resource, Role } from 'src/enum/enum';

export class CreatePolicyRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(Resource)
  resource: Resource;

  @IsNotEmpty()
  @IsEnum(Role, { each: true })
  subject: Role[];

  @IsNotEmpty()
  @IsEnum(Action, { each: true })
  actions: Action[];

  @IsNotEmpty()
  environment: Environment;
}
