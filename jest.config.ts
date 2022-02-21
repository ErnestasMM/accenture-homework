import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  }
};

export default config;
