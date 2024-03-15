import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { JWT } from '@app/helper/jwtToken';
import { UserController } from '@app/module/private/user/user.controller';
import { TagController } from '@app/module/private/tag/tag.controller';
import { UserModule } from '@app/module/private/user/index.module';
import { ArticleController } from '@app/module/private/article/article.controller';

@Module({
  imports: [UserModule],
  providers: [AuthMiddleware, JWT],
})
export class AuthMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(UserController, TagController, ArticleController);
  }
}
