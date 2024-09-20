import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is the root of the API. Go to /api to see the API documentation.';
  }
}
