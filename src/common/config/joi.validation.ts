import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  POSTGRES_USER: Joi.required(),
  POSTGRES_PASSWORD: Joi.required(),
  POSTGRES_DB: Joi.required(),
  DB_HOST: Joi.required(),
  DB_PORT: Joi.required(),
  // DB_SYNCHRONIZE: Joi.required().default(true),
  PORT: Joi.number().default(3000),
  CLOUD_NAME_CLOUDINARY: Joi.required(),
  API_KEY_CLOUDINARY: Joi.number().required(),
  API_SECRET_CLOUDINARY: Joi.required(),
  HOST_API: Joi.required(),
  SECRET_KEY: Joi.required(),
  APP_KEY: Joi.required(),
});
