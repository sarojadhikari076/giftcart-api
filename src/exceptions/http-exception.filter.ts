import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * @class AllExceptionsFilter
 * @implements {ExceptionFilter}
 * @classdesc A filter that catches all exceptions thrown by the application and formats the error response.
 * This filter logs error details and sends a formatted JSON response to the client with relevant error information.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  /**
   * @method catch
   * @param {unknown} exception - The exception that was thrown.
   * @param {ArgumentsHost} host - The host object that provides access to the request and response objects.
   * @returns {void}
   * @description
   * Catches all exceptions, logs the error details to the console, and sends a formatted JSON response
   * to the client. The response includes the status code, timestamp, request URL, error message, and stack trace (if available).
   * If the exception is an instance of `HttpException`, the status code from the exception is used; otherwise, a status code of 500 is used.
   *
   * @example
   * // Example usage with NestJS exception handling
   * app.useGlobalFilters(new AllExceptionsFilter());
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        exception instanceof Error
          ? exception.message
          : 'An unknown error occurred in the server',
      stack: exception instanceof Error ? exception.stack : null,
    };

    console.error(errorResponse);

    response.status(status).json(errorResponse);
  }
}
