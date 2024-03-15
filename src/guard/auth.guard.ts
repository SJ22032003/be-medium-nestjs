import { IRequest } from '@app/types';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest<IRequest>();
    if (request.user === null) {
      throw new HttpException('NOT AUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
