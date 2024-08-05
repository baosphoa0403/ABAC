import { SetMetadata } from '@nestjs/common';
import { Action, Resource, Role } from 'src/enum/enum';

export interface UserInfo {
  _id: string;
  name: string;
  fullName: string;
  username: string;
  password: string;
  role: {
    _id: string;
    name: string;
  };
  department: string;
  employmentStatus: string;
  permissions: Permission[];
}

export interface Permission {
  _id: string;
  actions: string[];
  resource: string;
}

export interface Policy {
  subject: Role[];
  resource: Resource;
  actions: Action[];
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const POLICY_KEY = 'policy';

export const CheckPolicies = (data: Policy) => SetMetadata(POLICY_KEY, data);
