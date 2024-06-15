import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { createHash } from 'crypto';
import {
  AccountsChangePasswordDto,
  AccountsFindUidByDto,
  AccountsRegisterDto,
} from './accounts.dto';
import { ValidationError } from 'class-validator';
import { IsNull } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  private validateId(value: string) {
    if (/^[a-zA-Z0-9]{6,20}$/.test(value)) {
      return value;
    } else {
      throw new ValidationError();
    }
  }

  private validatePassword(value: string): string {
    if (/^(?=.*[0-9])(?=.*[!@#$%^&*_-])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(value)) {
      return createHash('sha512').update(value).digest('hex');
    } else {
      throw new ValidationError();
    }
  }

  async findUidBy(dto: AccountsFindUidByDto): Promise<number> {
    const { uid } = await this.accountsRepository.findOneByOrFail({
      ...dto,
      password: this.validatePassword(dto.password),
      expiredAt: IsNull(),
    });

    return uid;
  }

  async isLive(uid: number): Promise<boolean> {
    return !(await this.accountsRepository.findOneByOrFail({ uid })).expiredAt;
  }

  async register(dto: AccountsRegisterDto): Promise<number> {
    const { password, ...account } = {
      ...dto,
      id: this.validateId(dto.id),
      password: this.validatePassword(dto.password),
    };
    const { uid } = await this.accountsRepository.save({
      ...account,
      password,
    });

    return uid;
  }

  async changePassword(
    uid: number,
    dto: AccountsChangePasswordDto,
  ): Promise<boolean> {
    const account = await this.accountsRepository.findOneBy({
      uid,
      password: this.validatePassword(dto.currentPassword),
    });

    if (account) {
      const result = await this.accountsRepository.update(
        { uid },
        { password: this.validatePassword(dto.newPassword) },
      );

      return result.affected > 0;
    }

    return false;
  }

  async expire(uid: number): Promise<boolean> {
    const account = await this.accountsRepository.findOneByOrFail({ uid });
    const result = await this.accountsRepository.softRemove([account], {
      reload: true,
    });

    return result.length > 0 && !!result[0].expiredAt;
  }
}
