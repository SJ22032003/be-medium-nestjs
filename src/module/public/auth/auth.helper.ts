import { UserEntity } from '@app/entity/user.entity';
import { IUserResponse } from './interface';
import { Repository } from 'typeorm';
import { JWT } from '@app/helper/jwtToken';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthUserHelper {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwt: JWT,
  ) {}

  buildAuthResponse(user: UserEntity): IUserResponse {
    delete user.password;
    return {
      user: {
        ...user,
        token: this.createJWT({ id: user.id, username: user.username }),
      },
    };
  }

  createJWT(details: object) {
    return this.jwt.generateJWT(details);
  }

  async doesUserAlreadyExists(email: string): Promise<boolean> {
    return (
      (await this.userRepo.count({
        where: { email },
      })) === 1
    );
  }
}
