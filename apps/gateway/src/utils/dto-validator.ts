import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const validateDto = <T, V>(cls: ClassConstructor<T>, plain: V): T => {
  const instance = plainToInstance(cls, plain, {
    excludeExtraneousValues: true,
  });
  const errors = validateSync(instance as object, {
    forbidUnknownValues: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    throw errors[0];
  }

  return instance;
};
