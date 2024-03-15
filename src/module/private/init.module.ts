import { Module } from '@nestjs/common';
import { UserModule } from '@app/module/private/user/index.module';
import { TagModule } from '@app/module/private/tag/tag.module';
import { AuthMiddlewareModule } from '@app/middleware/authentication/index.module';
import { ArticleModule } from './article/index.module';

@Module({
  imports: [AuthMiddlewareModule, UserModule, TagModule, ArticleModule],
  providers: [],
})
export default class InitializedPrivateModule {}
