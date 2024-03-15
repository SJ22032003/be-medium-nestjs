import { Module } from '@nestjs/common';
import { ArticleService } from '../private/article/article.service';
import { ArticleHelper } from '../private/article/article.helper';
import { CommonHelpers } from '@app/helper/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@app/entity/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  providers: [ArticleService, ArticleHelper, CommonHelpers],
  exports: [ArticleService, ArticleHelper, CommonHelpers],
})
export class ArticleSharedModule {}
