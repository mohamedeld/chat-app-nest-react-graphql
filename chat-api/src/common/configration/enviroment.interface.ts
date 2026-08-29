export interface IEnvironment {
  port: number;
  node_env: string;
  mongoUri: string;
  jwtSecret: string;
  accessTokenExpiration: string;
}
