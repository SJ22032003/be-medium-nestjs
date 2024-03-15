import { ArticleEntity } from '@app/entity/article.entity';
import { ArticleHelper } from '@app/module/private/article/article.helper';
import { ArticleService } from '@app/module/private/article/article.service';
import { IArticleResponse } from '@app/module/private/article/interface';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { FindOneOptions } from 'typeorm';

@Controller('public/article')
export class PublicArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly cntHelper: ArticleHelper,
  ) {}

  @Get(':slug')
  async getArticleForPublic(
    @Param('slug') slug: string,
  ): Promise<IArticleResponse> {
    const query: FindOneOptions<ArticleEntity> = {
      where: { slug },
      relations: ['author'],
    };

    const article = await this.articleService.getOneArticleBy(query);
    if (article === undefined) {
      throw new HttpException('No Article Found', HttpStatus.NOT_FOUND);
    }

    return this.cntHelper.buildArticleResponse(article);
  }
}
