import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TagEntity } from '../../../entity/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepo: Repository<TagEntity>,
  ) {}

  async getAllTags(): Promise<TagEntity[]> {
    return await this.tagRepo.find();
  }
}
