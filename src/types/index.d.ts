import { Request } from 'express';
import { UserEntity } from '../entity/user.entity';

export interface IRequest extends Request {
  user?: UserEntity;
}
