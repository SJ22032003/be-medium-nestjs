import { Module } from '@nestjs/common';
import { AuthUserModule } from './auth/index.module';
import { PublicArticleModule } from './article/index.module';
import { FeedPublicModule } from './feed/index.module';

@Module({
  imports: [AuthUserModule, PublicArticleModule, FeedPublicModule],
})
export default class InitializedPublicModule {}
