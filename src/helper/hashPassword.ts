import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

Injectable();
export class HashPassword {
  async hashingPassword(password: string): Promise<string> {
    const saltRound = 5;
    return await hash(password, saltRound);
  }

  async verifyingPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const verifiedPassword = await compare(password, hashedPassword);
    if (verifiedPassword === false) {
      throw new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST);
    }
    return true;
  }
}
