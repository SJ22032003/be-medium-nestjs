import { JWT } from '@app/helper/jwtToken';
import { UserService } from '@app/module/private/user/user.service';
import {
  NestMiddleware,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private token: string | undefined;
  constructor(
    private readonly jwt: JWT,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, _: Response, next: NextFunction) {
    this.token = req.headers.authorization;

    if (this.token === undefined) {
      throw new HttpException('NOT AUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    try {
      this.token = this.token.split(' ')[1];
      const decoded: { id: number } = this.jwt.verifyToken(this.token);
      const user = await this.userService.findOneUserById(decoded.id);
      if (!user) {
        throw new HttpException("User does't exists", HttpStatus.UNAUTHORIZED);
      }
      req['user'] = user;
    } catch (error) {
      throw new HttpException('INVALID AUTHORIZATION', HttpStatus.FORBIDDEN);
    }

    return next();
  }
}
