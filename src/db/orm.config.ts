import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mediumclone',
  password: '123',
  database: 'mediumclone',
  logging: !false,
  entities: [join(__dirname + '/../' + '**/*.entity{.ts,.js}')],
  synchronize: false, // true ONLY FOR DEVELOPMENT ENV
  migrations: [join(__dirname + '/../' + 'migrations/**/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as TypeOrmModuleOptions;
