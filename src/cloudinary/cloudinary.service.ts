import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Repository } from 'typeorm';
import { Cloudinary } from './entities/cloudinary.entity';
import { CreateCloudinaryDto } from './dto';
@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger('CloudinaryService');
  constructor(
    @InjectRepository(Cloudinary)
    private readonly cloudinaryRepository: Repository<Cloudinary>,
    private readonly configService: ConfigService,
  ) {
    this.conectCoudinary();
  }
  async uploadImage(
    file: Express.Multer.File,
    createCloudinaryDto: CreateCloudinaryDto,
  ) {
    try {
      const result = await this.uploadFile(file);
      const image = this.cloudinaryRepository.create({
        url: result.secure_url,
        public_id: result.public_id,
      });
      await this.cloudinaryRepository.save(image);
      return { url: result.secure_url };
    } catch (error) {
      this.handleDBExeption(error);
    }
  }

  async deleteImage(id: string) {
    try {
      const image = await this.cloudinaryRepository.findOneBy({ id });
      if (!image) {
        throw new BadRequestException(`Image with id:${id} no exist`);
      }
      await this.cloudinaryRepository.remove(image);
      await v2.uploader.destroy(image.public_id);
    } catch (error) {}
  }

  private async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream(
          {
            resource_type: 'image',
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(file.buffer);
    });
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }

  private handleDBExeption(error: any) {
    console.log({ error });

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    if (error.code === '23502') {
      throw new BadRequestException(`#${error.column} violates not-null.`);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Create Product cheque de error');
  }

  private conectCoudinary() {
    return v2.config({
      cloud_name: this.configService.get('CLOUD_NAME_CLOUDINARY'),
      api_key: this.configService.get('API_KEY_CLOUDINARY'),
      api_secret: this.configService.get('API_SECRET_CLOUDINARY'),
    });
  }
}
