const express = require('express');
const recipeController = require('../controllers/recipeController');
const router = express.Router();
router.get('/', recipeController.getRecipes, (req, res) => {
  res.status(200).json(res.locals.recipes);
});
router.get('/customs', recipeController.getCustoms, (req, res) => {
  console.log(res.locals.customs)
  res.status(200).json(res.locals.customs);
});
router.get('/rand', recipeController.getCuisineRecipes, (req, res) => {
  res.status(200).json(res.locals.recipes);
});
router.post('/', recipeController.createRecipe, (req, res) => {
  res.status(200).json(res.locals.recipe);
});
router.get('/favs', recipeController.getFavs, (req, res) => {
  res.status(200).json(res.locals.favs);
});

router.patch(
  '/favs',
  recipeController.addFavorites,
  recipeController.getRecipes,
  (req, res) => {
    res.status(200).json(res.locals.recipes);
  }
);
module.exports = router;
