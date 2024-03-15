import { Injectable } from '@nestjs/common';
import { UserEntity } from '@app/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findOneUserById(id: number): Promise<UserEntity> {
    return await this.userRepo.findOne({
      where: { id },
      cache: 5000,
    });
  }

  async updateOneUserByIdService(
    id: number,
    updateUserDTO: UpdateUserDTO,
  ): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { id } });
    Object.assign(user, updateUserDTO);
    return this.userRepo.save(user);
  }
}
