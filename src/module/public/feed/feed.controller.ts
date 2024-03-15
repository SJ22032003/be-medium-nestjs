import { User } from '@app/decorator/user.decorator';
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { IFeedArticleResponse } from './interface';
import { ArticleService } from '@app/module/private/article/article.service';
import { FindManyOptions } from 'typeorm';
import { ArticleEntity } from '@app/entity/article.entity';
import { FeedQueryDTO } from './dto';
import { ArticleHelper } from '@app/module/private/article/article.helper';

@Controller('public/feed')
export class PublicFeedController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly cntHelper: ArticleHelper,
  ) {}

  @Get()
  async getAllPaginatedArticles(
    @User('id') id: number,
    @Query(new ValidationPipe({ whitelist: true, transform: true }))
    feedQuery: FeedQueryDTO,
  ): Promise<IFeedArticleResponse> {
    const query: FindManyOptions<ArticleEntity> = {
      where: this.cntHelper.createQueryConditions(feedQuery),
      relations: ['author'],
      skip: feedQuery.skip,
      take: feedQuery.limit,
    };
    console.log(JSON.stringify(query));
    const [feed, count] = await this.articleService.findAllArticles(query);
    return this.cntHelper.buildFeedArticleResponse(feed, count);
  }
}
