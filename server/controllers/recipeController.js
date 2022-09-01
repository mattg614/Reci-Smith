const models = require('../models/recipesModels');
const { randomRecipe, Recipe, customRecipe } = models;

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
recipeController.createRecipe = (req, res, next) => {
  console.log(req.body);
  customRecipe.create(req.body, (err, recipe) => {
    if (err) {
      next({
        log: 'Error creating recipe in recipeController.createRecipe',
        status: 500,
        message: {
          err: `An error occurred in recipeController.createRecipe, ${err}`,
        },
      });
    }
    res.locals.recipe = recipe;
    next();
  });
};
recipeController.getCustoms = (req, res, next) => {
  customRecipe.find({}, (err, recipes) => {
    if (err) {
      next({
        log: 'Error getting custom recipes in recipeController.getCustoms',
        status: 500,
        message: {
          err: `An error occurred in recipeController.getCustoms, ${err}`,
        },
      });
    }
    // console.log(recipes);
    res.locals.customs = recipes;
    next();
  });
};

recipeController.getFavs = async (req, res, next) => {
  // const favorites = [];
  console.log('infavorites');
  customRecipe.find({ favorited: true }, (err, favs) => {
    if (err) {
      next({
        log: 'Error trying to get favorites from customRecipe in recipeController.getFavs',
        status: 500,
        message: {
          err: `An error occurred trying to get favorites from customRecipe, ${err}`,
        },
      });
    }

    res.locals.favs = favs;
    randomRecipe.find({ favorited: true }, (err, favs) => {
      if (err) {
        next({
          log: 'Error trying to get favorites from randomRecipe in recipeController.getFavs',
          status: 500,
          message: {
            err: `An error occurred trying to get favorites from randomRecipe, ${err}`,
          },
        });
      }
      res.locals.favs = res.locals.favs.concat(favs);
      Recipe.find({ favorited: true }, (err, favs) => {
        if (err) {
          next({
            log: 'Error trying to get favorites from Recipe in recipeController.getFavs',
            status: 500,
            message: {
              err: `An error occurred trying to get favorites from Recipe, ${err}`,
            },
          });
        }
        res.locals.favs = res.locals.favs.concat(favs);
        next();
      });
    });
  });
};
recipeController.addFavorites = (req, res, next) => {
  const { _id, collectionName, favorited } = req.body;
  console.log(_id, collectionName);
  if (collectionName === 'recipes') {
    Recipe.findOneAndUpdate(
      { _id },
      { $set: { favorited: favorited } },
      { upsert: false },
      (err, recipe) => {
        res.locals.favorite = recipe;
      }
    );
    // Recipe.find({ _id }, (err, recipe) => {
    //   console.log(recipe);
    // });
  } else if (collectionName === 'randomrecipes') {
    randomRecipe.findOneAndUpdate(
      { _id },
      { $set: { favorited: favorited } },
      { upsert: false },
      (err, recipe) => {
        res.locals.favorite = recipe;
      }
    );
  } else if (collectionName === 'customrecipes') {
    customRecipe.findOneAndUpdate(
      { _id },
      { $set: { favorited: favorited } },
      { upsert: false },
      (err, recipe) => {
        res.locals.favorite = recipe;
      }
    );
  }
  next();
};

module.exports = recipeController;
