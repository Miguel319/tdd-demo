import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus;

    try {
      status = exception.getStatus();
    } catch {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    let message: string = '';

    console.warn(exception);

    // Mongoose bad ObjectId
    if (
      exception.name === 'CastError' ||
      (!exception.message.includes('Cannot read') &&
        exception.message.includes('Cannot'))
    ) {
      const entityArr: string[] = exception.message.split(' ');

      const lastElementIdx: number = entityArr.length - 1;

      const entity: string = entityArr[lastElementIdx]
        .replace(/[""]/g, '')
        .toLowerCase();

      message =
        entity.includes('api/v1') || entity.includes('/')
          ? `Could not find ${entity}.`
          : `Could not find any ${entity} with the provided _id.`;
      status = HttpStatus.NOT_FOUND; // 404
    }

    // Mongoose duplicate key
    if ((exception as any).code === 11000) {
      const uniqueField: string = Object.keys(
        (exception as any).keyPattern,
      ).join('');

      message = `The '${uniqueField}' field is unique. There's already a record with the provided value.`;

      status = HttpStatus.BAD_REQUEST; // 400
    }

    // Mongoose validation exception
    if (exception.name === 'ValidationError') {
      const cutFrom: number = exception.message.indexOf(':') + 2;

      message = exception.message.slice(cutFrom);
      status = HttpStatus.BAD_REQUEST; // 400
    }

    // Authorization validation
    if (exception.name === 'JsonWebTokenError') {
      message = 'Unauthorized to access this route.';
      status = HttpStatus.UNAUTHORIZED; // 401
    }

    const altMessage: string =
      status === HttpStatus.INTERNAL_SERVER_ERROR // 500
        ? `${exception.message}.`
        : exception.message;

    response.status(status).json({
      success: false,
      statusCode: status,
      message: message || altMessage,
    });
  }
}
