import { Injectable } from '@nestjs/common';

/**
 * @class AppService
 * @classdesc This service provides methods for handling application logic related to the API.
 */
@Injectable()
export class AppService {
  /**
   * @method getHello
   * @description Generates a welcome message indicating the root of the API and the path to the API documentation.
   * @returns {string} The welcome message for the API root.
   * @example
   * const message = appService.getHello();
   * console.log(message); // Output: This is the root of the API. Go to /api to see the API documentation.
   */
  getHello(): string {
    return 'This is the root of the API. Go to /api to see the API documentation.';
  }
}
