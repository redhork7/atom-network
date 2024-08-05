import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ClientProxyChefrigo } from '../constants/chefrigo';

const ChefrigoProvider: Provider = {
  provide: ClientProxyChefrigo,
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: config.get<string>('APP_HOST_CHEFRIGO'),
        port: config.get<number>('APP_PORT_CHEFRIGO'),
      },
    });
  },
};

export default ChefrigoProvider;
