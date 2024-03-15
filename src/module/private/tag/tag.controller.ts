import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<{ tags: string[] }> {
    const result = await this.tagService.getAllTags();
    return {
      tags: result.map((tag) => tag.name),
    };
  }
}
