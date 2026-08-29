import { developmentEnv } from './enviroment-mode/development.env';
import { IEnvironment } from './enviroment.interface';

const environments = {
  development: developmentEnv,
};

type EnvironmentName = keyof typeof environments;

export default (): IEnvironment => {
  const env = (process.env.NODE_ENV ?? 'development') as EnvironmentName;
  const envConfig = environments[env];
  if (!envConfig) {
    throw new Error(`Invalid environment: ${env}`);
  }
  return envConfig();
};
