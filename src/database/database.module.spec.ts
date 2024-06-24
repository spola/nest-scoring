import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from './database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('DatabaseModule', () => {
  let dbModule: DatabaseModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseModule],
    }).compile();

    dbModule = module.get<DatabaseModule>(DatabaseModule);
  });

  it('should be defined', () => {
    expect(dbModule).toBeDefined();
  });
  it('should be connected', () => {
    
  });
});
