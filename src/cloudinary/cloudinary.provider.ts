import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (config: ConfigService) => {
    return v2.config({
      cloud_name: config.get('CLOUD_NAME_CLOUDINARY'),
      api_key: config.get('API_KEY_CLOUDINARY'),
      api_secret: config.get('API_SECRET_CLOUDINARY'),
    });
  },
  inject: [ConfigService],
};
