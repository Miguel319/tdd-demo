import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FooController } from './controllers/foo/foo.controller';
import { FooService } from './services/foo/foo.service';

@Module({
  imports: [],
  controllers: [AppController, FooController],
  providers: [AppService, FooService],
})
export class AppModule {}
