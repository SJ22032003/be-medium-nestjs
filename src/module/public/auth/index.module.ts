import { Module } from '@nestjs/common';
import { AuthUserController } from './auth.controller';
import { AuthUserService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/entity/user.entity';
import { JWT } from '@app/helper/jwtToken';
import { HashPassword } from '@app/helper/hashPassword';
import { AuthUserHelper } from './auth.helper';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthUserController],
  providers: [AuthUserService, AuthUserHelper, JWT, HashPassword],
})
export class AuthUserModule {}
