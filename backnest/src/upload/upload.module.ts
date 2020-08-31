import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './public/images')
        }, filename: (req, file, cb) => {
          cb(null, file.originalname)
        }
      })
    })
  ]
})
export class UploadModule { }
