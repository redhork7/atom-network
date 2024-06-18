import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class AppService {
  ping(): string {
    return format(new Date(), 'yyyyMMdd');
  }
}
