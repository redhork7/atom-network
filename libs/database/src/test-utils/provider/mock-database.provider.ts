import { Provider } from '@nestjs/common';

const MockDatabaseProvider: Provider = {
  provide: 'DatabaseProvider',
  useFactory: async () => {
    return {
      createEntityManager: jest.fn(),
    };
  },
};

export default MockDatabaseProvider;
