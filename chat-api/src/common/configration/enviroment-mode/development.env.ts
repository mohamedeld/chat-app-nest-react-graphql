import { IEnvironment } from '../enviroment.interface';
import { defaultEnv } from './default.env';

export const developmentEnv = (): IEnvironment => ({
  ...defaultEnv(),
});
