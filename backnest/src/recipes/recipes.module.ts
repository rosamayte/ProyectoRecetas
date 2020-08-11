import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from 'src/schemas/recipe';

@Module({
  imports: [MongooseModule.forFeature([{name: Recipe.name, schema: RecipeSchema}])],
  controllers: [RecipesController],
  providers: [RecipesService]
})
export class RecipesModule {}
