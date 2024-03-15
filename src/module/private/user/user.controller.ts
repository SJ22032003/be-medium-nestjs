import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@app/decorator/user.decorator';
import { AuthGuard } from '@app/guard/auth.guard';
import { UserEntity } from '@app/entity/user.entity';
import { UpdateUserDTO } from './dto';
import { UserHelper } from './user.helper';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly controllerHelper: UserHelper,
  ) {}

  @Get()
  async getUser(@User('id') id: number): Promise<UserEntity> {
    return this.controllerHelper.createUserResponse(
      await this.userService.findOneUserById(id),
    );
  }

  @Put()
  async updateUser(
    @User('id') id: number,
    @Body('user', new ValidationPipe({ whitelist: true }))
    updateUserDTO: UpdateUserDTO,
  ): Promise<{ message: string }> {
    if (
      updateUserDTO === undefined ||
      Object.keys(updateUserDTO).length === 0
    ) {
      throw new HttpException('No Valid Data', HttpStatus.BAD_REQUEST);
    }
    await this.userService.updateOneUserByIdService(id, updateUserDTO);
    return {
      message: 'User updated successfully',
    };
  }
}
