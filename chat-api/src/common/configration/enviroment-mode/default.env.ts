import { IEnvironment } from '../enviroment.interface';

export const defaultEnv = (): IEnvironment => ({
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION as string,
  node_env: process.env.NODE_ENV as string,
  db_name: process.env.DATABASE_NAME as string,
});
