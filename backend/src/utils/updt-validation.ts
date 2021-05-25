import { BadRequestException } from '@nestjs/common';

export const validateFieldsOnUpdt = (entity: any): void => {
  const areAllFieldsEmpty: boolean = Object.values(
    entity,
  ).some((property: any) => Boolean(property));

  if (!areAllFieldsEmpty)
    throw new BadRequestException('You must update at least one field.');
};
