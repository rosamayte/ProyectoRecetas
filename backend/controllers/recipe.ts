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