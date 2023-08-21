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
import { CreateCloudinaryDto } from './dto';
@Controller('files')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('uploads')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Body() createCloudinaryDto: CreateCloudinaryDto,
    @UploadedFile('file', ParseFilePipe) file: Express.Multer.File,
  ) {
    return this.cloudinaryService.uploadImage(file, createCloudinaryDto);
  }
}
