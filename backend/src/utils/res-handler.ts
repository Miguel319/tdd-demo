import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

type Res = {
  res: Response;
  status: HttpStatus;
  message?: string;
  meta?: Object;
};

export const sendReadRes = (res: Response, obj: any): Response =>
  res.status(HttpStatus.OK).json(obj);

export const sendWriteRes = (response: Res): Response => {
  const { res, status, message, meta } = response;

  return res.status(status).json({
    success: true,
    statusCode: status,
    message,
    ...meta,
  });
};
