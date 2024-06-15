import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountsRepository extends Repository<Account> {
  constructor(
    @Inject('DatabaseProvider') private readonly dataSource: DataSource,
  ) {
    super(Account, dataSource.createEntityManager());
  }
}
