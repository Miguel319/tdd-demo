import { Controller, Get } from '@nestjs/common';
import { FooService } from '../../services/foo/foo.service';

@Controller('foo')
export class FooController {
  constructor(private readonly fooService: FooService) {}

  @Get('')
  getAll() {
      return this.fooService.findAll();
  }
}
