import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { CreateCloudinaryDto } from './dto/create-cloudinary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cloudinary } from './entities/cloudinary.entity';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger('CloudinaryService');
  constructor(
    @InjectRepository(Cloudinary)
    private readonly cloudinaryRepository: Repository<Cloudinary>,
  ) {}
  async create(
    createCloudinaryDto: CreateCloudinaryDto,
    file: Express.Multer.File,
  ) {
    const result = await this.uploadFile(file);
    console.log(result);

    const url = this.cloudinaryRepository.create({ url: result.secure_url });

    try {
      await this.cloudinaryRepository.save(url);
      return { url };
    } catch (error) {
      this.handleDBExeption(error);
    }
  }

  private async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream(
          {
            resource_type: 'auto',
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
}
