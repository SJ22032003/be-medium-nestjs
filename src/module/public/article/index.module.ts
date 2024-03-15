import { Module } from '@nestjs/common';
import { PublicArticleController } from './article.controller';
import { ArticleSharedModule } from '@app/module/shared/article.shared.module';

@Module({
  imports: [ArticleSharedModule],
  controllers: [PublicArticleController],
})
export class PublicArticleModule {}
