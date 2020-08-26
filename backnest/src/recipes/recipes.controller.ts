import { Controller, Post, Body, Res, HttpStatus, Get, Patch, Delete, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from 'src/schemas/recipe';
import { Response } from 'express';
import { data } from 'src/app.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly service: RecipesService) { }

  @Post()
  async addRecipe(
    @Body() body: Recipe,
    @Res() res: Response
  ): Promise<void> {
    this.service.addRecipe(body).then((recipe: Recipe) => {
      if (!recipe) return res.status(HttpStatus.BAD_REQUEST).json(data<null>(
        null, HttpStatus.BAD_REQUEST, false
      ));
      res.status(HttpStatus.OK).json(data<Recipe>(recipe));
    }, err => {
      if (err._message === "Recipe validation failed") return res.status(HttpStatus.BAD_REQUEST).json(data(
        err, HttpStatus.BAD_REQUEST, false
      ));
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data(
        err, HttpStatus.INTERNAL_SERVER_ERROR, false
      ));
    });
  }

  @Get()
  async getAllRecipes(
    @Res() res: Response
  ): Promise<void> {
    this.service.getAllRecipes().then((recipes: Array<Recipe>) => {
      if (!recipes || recipes.length < 1) return res.status(HttpStatus.NOT_FOUND).json(data(
        null, HttpStatus.NOT_FOUND
      ));
      res.status(HttpStatus.OK).json(data(
        recipes
      ));
    }, err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data(
        err, HttpStatus.INTERNAL_SERVER_ERROR, false
      ));
    });
  }

  @Get('recipe/:id')
  async getRecipeById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    this.service.getRecipeById(id).then((recipe: Recipe) => {
      if (!recipe) return res.status(HttpStatus.NOT_FOUND).json(data(
        null, HttpStatus.NOT_FOUND
      ));
      res.status(HttpStatus.OK).json(data(
        recipe
      ));
    }, err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data(
        err, HttpStatus.INTERNAL_SERVER_ERROR, false
      ));
    });
  }

  @Get('top/:top')
  async getTopN(
    @Param('top') top: number,
    @Res() res: Response
  ): Promise<void> {
    this.service.getTopN(top).then((recipes: Array<Recipe>) => {
      if (!recipes || recipes.length < 1) return res.status(HttpStatus.NOT_FOUND).json(data(
        null, HttpStatus.NOT_FOUND
      ));
      res.status(HttpStatus.OK).json(data(recipes))
    }, err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data(
        err, HttpStatus.INTERNAL_SERVER_ERROR, false
      ));
    });
  }

  @Get('user/:id')
  async getRecipesByUser(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    this.service.getRecipesByUser(id).then((recipes: Array<Recipe>) => {
      if (!recipes || recipes.length < 1) return res.status(HttpStatus.NOT_FOUND).json(data(
        null, HttpStatus.NOT_FOUND
      ));
      res.status(HttpStatus.OK).json(data(recipes))
    }, err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data(
        err, HttpStatus.INTERNAL_SERVER_ERROR, false
      ));
    });
  }

  @Patch()
  async updateRecipe(
    @Body() body: Recipe,
    @Res() res: Response
  ): Promise<void> {
    this.service.updateRecipe(body).then((recipe: Recipe) => {
      if (!recipe) return res.status(HttpStatus.NOT_FOUND).json(data(
        null, HttpStatus.NOT_FOUND
      ));
      res.status(HttpStatus.OK).json(data(
        body
      ));
    }, err => {
      if (err._message === "Recipe validation failed") return res.status(HttpStatus.BAD_REQUEST).json(data(
        err, HttpStatus.BAD_REQUEST, false
      ));
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data(
        err, HttpStatus.INTERNAL_SERVER_ERROR, false
      ));
    });
  }

  @Delete(':id')
  async deleteRecipe(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    console.log(id)
    this.service.deleteRecipe(id).then((recipe: Recipe) => {
      if (!recipe) return res.status(HttpStatus.NOT_FOUND).json(data(
        null, HttpStatus.NOT_FOUND
      ));
      res.status(HttpStatus.OK).json(data(
        recipe
      ));
    }, err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data(
        err, HttpStatus.INTERNAL_SERVER_ERROR, false
      ));
    });
  }
}