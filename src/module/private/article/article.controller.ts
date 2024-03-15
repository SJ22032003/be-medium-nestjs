import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { User } from '@app/decorator/user.decorator';
import { CreateArticleDTO, UpdateArticleDTO } from './dto';
import { ArticleService } from './article.service';
import { UserEntity } from '@app/entity/user.entity';
import { ArticleHelper } from './article.helper';
import { IArticleResponse } from './interface';
import { FindConditions } from 'typeorm';
import { ArticleEntity } from '@app/entity/article.entity';

@Controller('articles')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly cntHelper: ArticleHelper,
  ) {}

  @Post()
  async createNewArticle(
    @User() user: UserEntity,
    @Body('article', new ValidationPipe({ whitelist: true }))
    createArticleDTO: CreateArticleDTO,
  ): Promise<IArticleResponse> {
    const article = await this.articleService.createNewArticleService(
      user,
      createArticleDTO,
    );
    return this.cntHelper.buildArticleResponse(article);
  }

  @Put(':slug')
  async updateAuthorArticle(
    @User('id') id: number,
    @Param('slug') slug: string,
    @Body('article', new ValidationPipe({ whitelist: true }))
    updateArticleDTO: UpdateArticleDTO,
  ) {
    const article = await this.articleService.getOneArticleBy({
      where: { slug, author: { id } },
      relations: ['author'],
    });

    if (article === undefined) {
      throw new HttpException('Article Not Found', HttpStatus.NOT_FOUND);
    }

    if (id !== article.author.id) {
      throw new HttpException(
        'Article Does Not Belongs To You',
        HttpStatus.FORBIDDEN,
      );
    }

    Object.assign(article, updateArticleDTO);
    const updatedArticle =
      await this.articleService.updateArticleService(article);

    return this.cntHelper.buildArticleResponse(updatedArticle);
  }

  @Delete(':slug')
  async deleteAuthorArticle(
    @User('id') id: number,
    @Param('slug') slug: string,
  ): Promise<{ message: string }> {
    const article = await this.articleService.getOneArticleBy({
      where: { slug },
      relations: ['author'],
    });

    if (article === undefined) {
      throw new HttpException('Article Not Found', HttpStatus.NOT_FOUND);
    }

    if (id !== article.author.id) {
      throw new HttpException(
        'Article Does Not Belongs To You',
        HttpStatus.FORBIDDEN,
      );
    }

    const query: FindConditions<ArticleEntity> = {
      slug,
      author: { id },
    };
    await this.articleService.deleteOneArticleByService(query);

    return { message: 'Article Deleted Successfully' };
  }
}
