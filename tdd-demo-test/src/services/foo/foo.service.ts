import { Injectable } from '@nestjs/common';
import { Foo } from '../../models/foo';

@Injectable()
export class FooService {
  findAll(): Array<Foo> {
    const foos: Array<Foo> = [
      {
        name: 'Whateva',
        favColor: 'blue',
      },
      {
        name: 'Whateva 2',
        favColor: 'pink',
      },
    ];

    return foos;
  }
}
