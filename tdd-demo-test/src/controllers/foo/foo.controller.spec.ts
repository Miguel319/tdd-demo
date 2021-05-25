import { Test, TestingModule } from '@nestjs/testing';
import { FooController } from './foo.controller';
import { FooService } from '../../services/foo/foo.service';
import { Foo } from '../../../dist/models/foo';

describe('FooController', () => {
  let fooController: FooController;
  let fooService: FooService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FooController],
      providers: [FooService],
    }).compile();

    fooService = moduleRef.get<FooService>(FooService);
    fooController = moduleRef.get<FooController>(FooController);
  });

  describe('findAll', () => {
    it('should return an array of 1 cat1', () => {
      const foos: Array<Foo> = [
        {
          name: 'Whateva',
          favColor: 'blue',
        },
      ];

      jest.spyOn(fooService, 'findAll').mockImplementation(() => foos);

      expect(fooController.getAll().length).toBe(1);
    });
  });

  it('should be defined', () => {
    expect(fooController).toBeDefined();
  });
});
