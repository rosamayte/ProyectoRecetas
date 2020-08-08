import Router, { Express } from 'express';
import * as ctrl from '../controllers/recipe';

export const router: Express = Router();

router.post('/', ctrl.addRecipe);

router.get('/', ctrl.getAllRecipes);
router.get('/recipe/:_id', ctrl.getRecipeById);
router.get('/user/:id', ctrl.getRecipesByUser);
router.get('/top/:top', ctrl.getTopN);

router.delete('/:_id', ctrl.deleteById);

router.patch('/', ctrl.updateById);
