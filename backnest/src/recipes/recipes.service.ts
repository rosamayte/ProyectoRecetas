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

  async getRecipeById(_id: string): Promise<Recipe> {
    return this.recipeModel.findById(_id).exec();
  }

  async getTopN(top: number = 5): Promise<Array<Recipe>> {
    return this.recipeModel.find({ top }).exec()
  }

  async getRecipesByUser(owner: string): Promise<Array<Recipe>> {
    return this.recipeModel.find({ owner })
  }

  async updateRecipe(recipe: Recipe): Promise<Recipe> {
    return this.recipeModel.findByIdAndUpdate(recipe._id, recipe).exec();
  }

  async setImage(id: string, name: string): Promise<Recipe> {
    const r = await this.recipeModel.findById(id);
    if (!r) return null;
    r.picture = await name;
    return await r.save()
  }

  async voteUp(id: string, v: number): Promise<Recipe> {
    const r = await this.recipeModel.findById(id);
    if (!r) return null;
    // const nv = await r.votes
    // nv[0] += await v;
    // await nv[1]++;
    // r.votes = nv
    // return await this.recipeModel.findByIdAndUpdate(id,r).exec();
    r.votes.set(0,r.votes[0]+v);
    r.votes.set(1,r.votes[1]+1);
    return await r.save();
  }

  async voteDown(id: string): Promise<Recipe> {
    return null;
  }

  async deleteRecipe(_id: string): Promise<Recipe> {
    return this.recipeModel.findByIdAndDelete(_id).exec();
  }
}
