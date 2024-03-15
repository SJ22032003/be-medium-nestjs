import { UserEntity } from '@app/entity/user.entity';

export class UserHelper {
  createUserResponse(user: UserEntity) {
    delete user.password;
    delete user.id;
    return user;
  }
}
