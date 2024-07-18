import { Repository } from 'typeorm';

export const findOneBySpy = <T>(repository: Repository<T>, mock: any) => {
  return jest.spyOn(repository, 'findOneBy').mockResolvedValue(mock as T);
};

export const findBySpy = <T>(repository: Repository<T>, mock: any[]) => {
  return jest.spyOn(repository, 'findBy').mockResolvedValue(mock as T[]);
};

export const saveSpy = <T>(repository: Repository<T>, mock: any) => {
  return jest.spyOn(repository, 'save').mockResolvedValue(mock as T);
};

export const findOneByOrFailSpy = <T>(repository: Repository<T>, mock: any) => {
  return jest.spyOn(repository, 'findOneByOrFail').mockResolvedValue(mock as T);
};

export function updateSpy(repository: Repository<any>, mock?: number) {
  return jest
    .spyOn(repository, 'update')
    .mockResolvedValue({ affected: mock || 1 } as any);
}

export const softRemoveSpy = <T>(repository: Repository<T>, mock?: any) => {
  return jest
    .spyOn(repository, 'softRemove')
    .mockResolvedValue((mock ? [mock] : []) as any);
};

export const softDeleteSpy = <T>(repository: Repository<T>, mock?: any) => {
  return jest
    .spyOn(repository, 'softDelete')
    .mockResolvedValue({ affected: mock || 1 } as any);
};

export const restoreSpy = <T>(repository: Repository<T>, mock?: any) => {
  return jest
    .spyOn(repository, 'restore')
    .mockResolvedValue({ affected: mock || 1 } as any);
};

export const deleteSpy = <T>(repository: Repository<T>, mock?: number) => {
  return jest
    .spyOn(repository, 'delete')
    .mockResolvedValue({ affected: mock || 1 } as any);
};

export const createQueryBuilderSpy = <T>(
  repository: Repository<T>,
  mock?: any,
) => {
  const mockCreateQueryBuilder: any = {
    update: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    execute: jest.fn().mockResolvedValue({ affected: mock }),
  };

  return jest
    .spyOn(repository, 'createQueryBuilder')
    .mockImplementation(() => mockCreateQueryBuilder);
};
