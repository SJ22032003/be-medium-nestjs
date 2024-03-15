import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthUserService } from './auth.service';
import { LoginUserDTO, RegisterUserDTO } from './dto';
import { IUserResponse } from './interface';
import { AuthUserHelper } from './auth.helper';

@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthUserController {
  constructor(
    private readonly authUserService: AuthUserService,
    private readonly cntHelper: AuthUserHelper,
  ) {}

  @Post('register')
  async registerNewUser(
    @Body('user') registerUserDTO: RegisterUserDTO,
  ): Promise<IUserResponse> {
    const user =
      await this.authUserService.registerUserService(registerUserDTO);
    return this.cntHelper.buildAuthResponse(user);
  }

  @Post('login')
  async loginUser(
    @Body('user') loginUserDTO: LoginUserDTO,
  ): Promise<IUserResponse> {
    const user = await this.authUserService.loginUserService(loginUserDTO);
    return this.cntHelper.buildAuthResponse(user);
  }
}
