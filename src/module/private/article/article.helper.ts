import { Injectable } from '@nestjs/common';
import { ArticleEntity } from '@app/entity/article.entity';
import { FindConditions, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IArticleResponse } from './interface';
import { FeedQueryDTO } from '@app/module/public/feed/dto';
import { IFeedArticleResponse } from '@app/module/public/feed/interface';

@Injectable()
export class ArticleHelper {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepo: Repository<ArticleEntity>,
  ) {}

  async doesArticleSlugExists(slug: string) {
    return (
      (await this.articleRepo.count({
        where: { slug },
      })) === 1
    );
  }

  buildArticleResponse(_article: ArticleEntity): IArticleResponse {
    delete _article.author.password;
    return { article: _article };
  }

  buildFeedArticleResponse(
    feed: ArticleEntity[],
    count: number,
  ): IFeedArticleResponse {
    return {
      articles: feed.map((article) => this.buildArticleResponse(article)),
      articlesCount: count,
    };
  }

  createQueryConditions(
    feedQuery: FeedQueryDTO,
  ): FindConditions<ArticleEntity> {
    const requiredObj: FindConditions<ArticleEntity> = {};
    if (feedQuery.author) {
      requiredObj.author = { username: feedQuery.author };
    }
    if (feedQuery.tag) {
      requiredObj.tagList = Like(`%${feedQuery.tag}%`) as any;
    }
    return requiredObj;
  }
}
