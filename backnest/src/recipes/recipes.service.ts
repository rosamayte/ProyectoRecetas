import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from 'src/schemas/recipe';
import { Model } from 'mongoose';
import { CreateRecipeDto } from 'src/dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) { }

  async addRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const createdRecipe = new this.recipeModel(createRecipeDto);
    return createdRecipe.save();
  }

  async getAllRecipes(): Promise<Array<Recipe>> {
    return this.recipeModel.find().exec();
  }

  async getRecipeById(_id: string): Promise<Recipe>{
    return this.recipeModel.findById(_id).exec();
  }

  async getTopN(top:number = 5): Promise<Array<Recipe>>{
    return this.recipeModel.find({top}).exec()
  }

  async getRecipesByUser(owner: string): Promise<Array<Recipe>>{
    return this.recipeModel.find({owner})
  }

  async updateById(recipe: Recipe): Promise<Recipe>{
    return this.recipeModel.findByIdAndUpdate(recipe,recipe._id).exec();
  }

  async deleteById(_id: string): Promise<Recipe>{
    return this.recipeModel.findByIdAndDelete(_id).exec();
  }
}
