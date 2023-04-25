import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [UsersService],
      }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result: User = {
        username: 'John',
        password: 'azertyuiop',
      }

      jest.spyOn(usersService, 'findOne').mockImplementation(() => result);

      expect(await usersController.findOne("2")).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{
        name: 'Cat',
        password: '123',
      }];
      jest.spyOn(usersService, 'findAll').mockImplementation(() => result);

      expect(await usersController.findAll()).toBe(result);
    });
  });
});
