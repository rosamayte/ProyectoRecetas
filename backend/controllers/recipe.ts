import Recipe, { IRecipe } from '../models/recipe';
import { Request, Response } from 'express';

export const addRecipe = async (req: Request, res: Response): Promise<void> => {
  const body: IRecipe = req.body;
  const recipe: IRecipe = new Recipe(body);
  recipe.save().then((r: IRecipe) => {
    res.status(201).json({ status: 201, ok: true, data: r });
  }, (error: any) => {
    res.status(500).json({ status: 500, ok: false, data: error });
  });
}

export const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
  Recipe.find({}, (error: any, recipes: Array<IRecipe>): Response | undefined => {
    if (error) return res.status(500).json({ status: 500, ok: false, data: error });
    if (!recipes || recipes.length < 1) return res.status(404).json({ status: 404, ok: true, data: [] });
    res.status(200).json({ status: 200, ok: true, data: recipes });
  })
}

export const getRecipeById = async (req: Request, res: Response): Promise<void> => {
  Recipe.findOne({ _id: req.params._id }, (error: any, recipe: IRecipe): Response | undefined => {
    if (error) return res.status(500).json({ status: 500, ok: false, data: error });
    if (!recipe) return res.status(404).json({ status: 404, ok: true, data: null });
    res.status(200).json({ status: 200, ok: true, data: recipe });
  })
}

export const getTopN = async (req: Request, res: Response): Promise<void> => {
  Recipe.find({}, (error: any, recipes: Array<IRecipe>): Response | undefined => {
    if (error) return res.status(500).json({ status: 500, ok: false, data: error });
    if (!recipes || recipes.length < 1) return res.status(404).json({ status: 404, ok: true, data: [] });
    res.status(200).json({ status: 200, ok: true, data: recipes.slice(0, parseInt(req.params.top || '5')) });
  })
}

export const getRecipesByUser = async (req: Request, res: Response): Promise<void> => {
  Recipe.find({ owner: req.params.id }, (error: any, recipes: Array<IRecipe>): Response | undefined => {
    if (error) return res.status(500).json({ status: 500, ok: false, data: error });
    if (!recipes || recipes.length < 1) return res.status(404).json({ status: 404, ok: true, data: [] });
    res.status(200).json({ status: 200, ok: true, data: recipes });
  })
}

export const updateById = async (req: Request, res: Response): Promise<void> => {
  await (async () => {
    const recipe = await Recipe.findById(req.body._id);
    if (!recipe) return res.status(404).json({ status: 404, ok: false, data: null });
    recipe.set(req.body);
    try {
      await recipe.save();
      return res.status(200).json({ status: 200, ok: true, data: recipe });
    } catch (error) {
      return res.status(400).json({ status: 400, ok: false, data: error });
    }
  })()
}

export const deleteById = async (req: Request, res: Response): Promise<void> => {
  Recipe.findByIdAndRemove(req.params._id).then((r: IRecipe | null) => {
    if (!r) return res.status(404).json({ status: 404, ok: false, data: null })
    res.status(200).json({ status: 200, ok: true, data: r });
  }, (error: any) => res.status(400).json({ status: 400, ok: false, data: error }))
}
