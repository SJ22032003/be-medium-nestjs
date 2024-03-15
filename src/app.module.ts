import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/db.module';
import InitializedPrivateModule from '@app/module/private/init.module';
import InitializedPublicModule from '@app/module/public/init.module';
import HelperModule from '@app/helper/index.module';

@Module({
  imports: [
    DatabaseModule,
    HelperModule,
    InitializedPublicModule,
    InitializedPrivateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
