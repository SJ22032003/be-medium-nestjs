/* eslint-disable prettier/prettier */
import { UserEntity } from '@app/entity/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RegisterUserDTO, LoginUserDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserHelper } from './auth.helper';
import { HashPassword } from '@app/helper/hashPassword';

@Injectable()
export class AuthUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authUserRepo: Repository<UserEntity>,
    private readonly hash: HashPassword,
    private readonly serviceHelper: AuthUserHelper,
  ) {}

  async registerUserService(
    registerUserDTO: RegisterUserDTO,
  ): Promise<UserEntity> {
    if (await this.serviceHelper.doesUserAlreadyExists(registerUserDTO.email)) {
      throw new HttpException(
        'User already exists. Please login',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, {
      ...registerUserDTO,
      password: await this.hash.hashingPassword(registerUserDTO.password),
    });
    return await this.authUserRepo.save(newUser);
  }

  async loginUserService(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
    const user = await this.authUserRepo.findOne({
      where: { email: loginUserDTO.email },
    });

    if (user === null) {
      throw new HttpException(
        'User does not exist. Please register',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (
      (await this.hash.verifyingPassword(
        loginUserDTO.password,
        user.password,
      )) === false
    ) {
      throw new HttpException('Incorrect Password', HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
