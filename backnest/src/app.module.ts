import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {ServeStaticModule} from '@nestjs/serve-static'
import { join } from 'path';
import { UploadModule } from './upload/upload.module';


@Module({
  imports: [
    RecipesModule, 
    UsersModule,
    AuthModule,
    ServeStaticModule.forRoot({rootPath: join(__dirname,'..','public')}),
    MongooseModule.forRoot('mongodb://localhost:27017/recipes2', 
    {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}),
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

