import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JWT {
  generateJWT(data: object) {
    return sign(data, 'JWT_SECRET');
  }

  verifyToken(token: string) {
    return verify(token, 'JWT_SECRET');
  }
}
