import { Module } from '@nestjs/common';
import { AccountsModule } from '../accounts/accounts.module';
import { SignInService } from './sign-in/sign-in.service';
import { SignInController } from './sign-in/sign-in.controller';
import { SignUpService } from './sign-up/sign-up.service';
import { SignUpController } from './sign-up/sign-up.controller';
import { SignController } from './sign.controller';

@Module({
  imports: [AccountsModule],
  providers: [SignInService, SignUpService],
  controllers: [SignInController, SignUpController, SignController],
})
export class SignModule {}
