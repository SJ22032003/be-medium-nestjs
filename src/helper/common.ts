import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonHelpers {
  convertStringToSlug(str: string) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');
  }
}
