import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user === undefined) return null;
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
