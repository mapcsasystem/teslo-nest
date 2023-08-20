import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './cloudinary.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { Cloudinary } from './entities/cloudinary.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Cloudinary])],
  controllers: [CloudinaryController],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [TypeOrmModule, CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
