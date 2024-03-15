import {
  DeleteResult,
  FindConditions,
  FindManyOptions,
  Repository,
} from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDTO } from './dto';
import { ArticleEntity } from '@app/entity/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/entity/user.entity';
import { CommonHelpers } from '@app/helper/common';
import { ArticleHelper } from './article.helper';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepo: Repository<ArticleEntity>,
    private readonly helper: CommonHelpers,
    private readonly serviceHelper: ArticleHelper,
  ) {}

  async createNewArticleService(
    user: UserEntity,
    createDTO: CreateArticleDTO,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();

    Object.assign(article, createDTO);
    if (!article.tagList) {
      article.tagList = [];
    }

    article.slug = this.helper.convertStringToSlug(article.title);
    if (await this.serviceHelper.doesArticleSlugExists(article.slug)) {
      throw new HttpException(
        'Article Slug Already Exists',
        HttpStatus.FORBIDDEN,
      );
    }

    article.author = user;
    return this.articleRepo.save(article);
  }

  async updateArticleService(
    dataToUpdate: ArticleEntity,
  ): Promise<ArticleEntity> {
    console.log(dataToUpdate);
    return this.articleRepo.save(dataToUpdate);
  }

  async findAllArticles(
    query: FindManyOptions<ArticleEntity>,
  ): Promise<[ArticleEntity[], number]> {
    return this.articleRepo.findAndCount(query);
  }

  async getOneArticleBy(
    query: FindOneOptions<ArticleEntity>,
  ): Promise<ArticleEntity> {
    return this.articleRepo.findOne(query);
  }

  async deleteOneArticleByService(
    query: FindConditions<ArticleEntity>,
  ): Promise<DeleteResult> {
    return this.articleRepo.delete(query);
  }
}
