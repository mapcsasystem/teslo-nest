import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { Cloudinary } from './entities/cloudinary.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Cloudinary])],
  controllers: [CloudinaryController],
  providers: [CloudinaryService],
  exports: [TypeOrmModule, CloudinaryService],
})
export class CloudinaryModule {}
