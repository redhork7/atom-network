import { Repository } from 'typeorm';

export const findOneBySpy = <T>(repository: Repository<T>, mock: any) => {
  return jest.spyOn(repository, 'findOneBy').mockResolvedValue(mock as T);
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
