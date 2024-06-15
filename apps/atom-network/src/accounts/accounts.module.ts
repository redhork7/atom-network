import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { AccountsRepository } from './accounts.repository';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';

@Module({
  imports: [DatabaseModule],
  providers: [AccountsService, AccountsRepository],
  controllers: [AccountsController],
  exports: [AccountsService],
})
export class AccountsModule {}
