export const envConfiguration = () => ({
  NODE_ENV: process.env.NODE_ENV || 'dev',
  PORT: +process.env.PORT || 3000,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  // DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: +process.env.DB_PORT,
});
