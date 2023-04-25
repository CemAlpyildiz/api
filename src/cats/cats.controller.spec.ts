import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CatsController],
        providers: [CatsService],
      }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('findOne', () => {
    it('should return a cat', async () => {
      const result: Cat = {
        name: 'Cat',
        age: 5,
        breed: 'Breed',
      }

      jest.spyOn(catsService, 'findOne').mockImplementation(() => result);

      expect(await catsController.findOne("2")).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = [{
        name: 'Cat',
        age: 5,
        breed: 'Breed',
      }];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});
