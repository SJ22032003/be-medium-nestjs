import { Module } from '@nestjs/common';
import { PublicFeedController } from './feed.controller';
import { ArticleSharedModule } from '@app/module/shared/article.shared.module';

@Module({
  imports: [ArticleSharedModule],
  controllers: [PublicFeedController],
  providers: [],
})
export class FeedPublicModule {}
