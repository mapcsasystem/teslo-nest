import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { CreateCloudinaryDto } from './dto/create-cloudinary.dto';
@Controller('files')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('uploads')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createCloudinaryDto: CreateCloudinaryDto,
    @UploadedFile('file', ParseFilePipe) file: Express.Multer.File,
  ) {
    // const result = await this.uploadsService.uploadFile(file);
    return this.cloudinaryService.create(createCloudinaryDto, file);
  }
}
