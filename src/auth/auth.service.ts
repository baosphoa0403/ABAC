import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

export type Payload = {
  _id: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.findOne(username);

    if (!user) throw new BadRequestException('user not found');

    if (user.password !== pass) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id } = user;

    return {
      access_token: await this.jwtService.signAsync({ _id: _id }),
    };
  }
}
