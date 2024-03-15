import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@app/entity/article.entity';
import { CommonHelpers } from '@app/helper/common';
import { ArticleHelper } from './article.helper';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleHelper, CommonHelpers],
})
export class ArticleModule {}
