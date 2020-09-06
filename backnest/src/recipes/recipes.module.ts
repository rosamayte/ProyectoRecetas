import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from 'src/schemas/recipe';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Recipe.name, schema: RecipeSchema}]),
    MulterModule.register({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './public/images/recipes')
        }, filename: (req, file, cb) => {
          cb(null, file.originalname)
        }
      })
    })
  ],
  controllers: [RecipesController],
  providers: [RecipesService]
})
export class RecipesModule {}
