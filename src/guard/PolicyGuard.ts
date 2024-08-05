import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PolicyEntity } from 'src/database/entities/policy';
import { POLICY_KEY, Policy, UserInfo } from 'src/decorator/decorator';
import { Role } from 'src/enum/enum';
import { PermissionService } from 'src/permission/permission.service';
@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPolicy = this.reflector.getAllAndOverride<Policy>(
      POLICY_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPolicy) {
      return true;
    }

    const { resource } = requiredPolicy;

    const policy = await this.permissionService.getPolicyByResource(resource);

    const { user } = context.switchToHttp().getRequest();

    this.allow(user, requiredPolicy, policy);

    return true;
  }

  allow(user: UserInfo, requiredPolicy: Policy, policy: PolicyEntity): void {
    const { subject, resource } = requiredPolicy;
    console.log('user', user);
    console.log('requiredPolicy', requiredPolicy);
    console.log('policy', policy);

    const userRole = user.role.name;
    // check role required
    const isValidRoleRequired = !subject.includes(userRole as Role);
    if (isValidRoleRequired) {
      throw new ForbiddenException(
        `role ${userRole} user not match required api`,
      );
    }

    if (!policy) {
      throw new BadRequestException(
        'please set up policy for resource',
        resource,
      );
    }

    const isValidRolePolicy = !policy.subject.includes(userRole as Role);
    // check role in policy
    if (isValidRolePolicy) {
      throw new ForbiddenException(
        `role ${userRole} user not match required policy is ${policy.subject.join(',')}`,
      );
    }

    const permissionOfUser = user.permissions.filter((e) => {
      return (
        requiredPolicy.resource === e.resource && policy.resource === e.resource
      );
    });

    console.log('permissionOfUser', permissionOfUser);

    if (!Boolean(permissionOfUser.length)) {
      throw new ForbiddenException(`user not permission in resource`);
    }

    // check action in policy

    const actionOfUser = user.permissions.filter((e) => {
      return (
        e.actions.includes('manage') ||
        policy.actions.filter((p) => {
          return e.actions.includes(p);
        }).length !== 0
      );
    });
    if (!Boolean(actionOfUser.length)) {
      throw new ForbiddenException(
        `user not action in resource required ${policy.actions.join(',')}`,
      );
    }

    // check environment
  }
}
