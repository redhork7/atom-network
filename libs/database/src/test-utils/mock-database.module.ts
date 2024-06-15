import { Module } from '@nestjs/common';
import MockDatabaseProvider from './provider/mock-database.provider';

@Module({
  providers: [MockDatabaseProvider],
  exports: [MockDatabaseProvider],
})
export class MockDatabaseModule {}
