export interface EnvVariables {
  SERVER_PORT: number;
  NODE_ENV: string;
  MONGO_USER_PWD: string;
  MONGO_USERNAME: string;
  MONGO_DATABASE_NAME: string;
  MONGO_CLUSTER_URL: string;
  URL_WEBSITE: string;
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_LIFE: number;
}

export const variables: EnvVariables = {
  SERVER_PORT: +(process.env.PORT || 3000),

  // ACCESS TOKEN VARIABLES
  ACCESS_TOKEN_SECRET: process.env.TOKEN_SECRET || '@secret*c0v1d',
  ACCESS_TOKEN_LIFE: +(process.env.ACCESS_TOKEN_LIFE || 120),

  // MONGO VARIABLES
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_USER_PWD: process.env.MONGO_DB_USER_PWD || 'hydr@electric!',
  MONGO_USERNAME: process.env.MONGO_USERNAME || 'hydrouser',
  MONGO_DATABASE_NAME: process.env.MONGO_DATABASE_NAME || 'hydro-electric2021',
  MONGO_CLUSTER_URL: process.env.MONGO_CLUSTER_URL || 'replace-cluster-url-here',
  URL_WEBSITE: process.env.URL_WEBSITE || '',
};
