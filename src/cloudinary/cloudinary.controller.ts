import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  Delete,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { CreateCloudinaryDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cloudinary')
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

  @Delete('delete/:id')
  async deleteImage(@Param('id', ParseUUIDPipe) id: string) {
    return this.cloudinaryService.remove(id);
  }
}
