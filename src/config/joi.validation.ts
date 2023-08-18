import * as Joi from 'joi';

export const JoinValidationSchema = Joi.object({
  MONGO_DB_URI: Joi.required(),
  POSTGRES_USER: Joi.required(),
  POSTGRES_PASSWORD: Joi.required(),
  POSTGRES_DB: Joi.required(),
  DB_HOST: Joi.required(),
  DB_PORT: Joi.required(),
  PORT: Joi.number().default(3000),
});
