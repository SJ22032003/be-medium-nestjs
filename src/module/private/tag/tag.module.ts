import { Module } from '@nestjs/common';
import { TagController } from '@app/module/private/tag/tag.controller';
import { TagService } from '@private/tag/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '@app/entity/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
