import { Injectable } from '@nestjs/common';
import { Data } from './interfaces/data.interface';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

export const data = <T = any>(
  body: T,
  statusCode = 200,
  ok = true
): Data<T> => {
  return { statusCode, ok, body }
}