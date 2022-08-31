const models = require('../models/recipesModels');
const { randomRecipe, Recipe } = models;

const recipeController = {};

recipeController.getRecipes = (req, res, next) => {
  console.log('ingetrecipes');
  randomRecipe.find({}, (err, recipes) => {
    if (err) {
      next({
        log: 'Error getting initial recipes in recipeController.getRecipes',
        status: 500,
        message: {
          err: `An error occurred in recipeController.getRecipes, ${err}`,
        },
      });
    }
    // console.log(recipes);
    res.locals.recipes = recipes;
    next();
  });
};
recipeController.getCuisineRecipes = (req, res, next) => {
  Recipe.find({}, (err, recipes) => {
    if (err) {
      next({
        log: 'Error getting initial recipes in recipeController.getCuisineRecipes',
        status: 500,
        message: {
          err: `An error occurred in recipeController.getCuisineRecipes, ${err}`,
        },
      });
    }
    res.locals.recipes = recipes;
    next();
  });
};

module.exports = recipeController;
