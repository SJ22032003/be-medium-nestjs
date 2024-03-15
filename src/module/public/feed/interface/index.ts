import { IArticleResponse } from '@app/module/private/article/interface';

export interface IFeedArticleResponse {
  articles: IArticleResponse[];
  articlesCount: number;
}
