export const envConfiguration = () => ({
  NODE_ENV: process.env.NODE_ENV || 'dev',
  PORT: +process.env.PORT || 3000,
});
