import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyAtomNetwork } from '../constants/atom-network';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const AtomNetworkProvider: Provider = {
  provide: ClientProxyAtomNetwork,
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: config.get<string>('APP_HOST_ATOM_NETWORK'),
        port: config.get<number>('APP_PORT_ATOM_NETWORK'),
      },
    });
  },
};

export default AtomNetworkProvider;
