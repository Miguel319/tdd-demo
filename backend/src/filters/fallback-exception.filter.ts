import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class FallbackExpectionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(
      'fallback exception handler triggered',
      JSON.stringify(exception),
    );

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const BAD_REQUEST: HttpStatus = HttpStatus.BAD_REQUEST;

    return response.status(BAD_REQUEST).json({
      success: false,
      statusCode: BAD_REQUEST,
      message: exception.message
        ? exception.message
        : 'Unexpected error ocurred.',
    });
  }
}
