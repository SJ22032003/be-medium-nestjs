import { Module } from '@nestjs/common';
import { UserController } from '@app/module/private/user/user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/entity/user.entity';
import { AuthGuard } from '@app/guard/auth.guard';
import { UserHelper } from './user.helper';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [AuthGuard, UserService, UserHelper],
  exports: [UserService],
})
export class UserModule {}
