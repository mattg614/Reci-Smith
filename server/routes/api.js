const express = require('express');
const recipeController = require('../controllers/recipeController');
const router = express.Router();
router.get('/', recipeController.getRecipes, (req, res) => {
  res.status(200).json(res.locals.recipes);
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
router.patch('/favs', recipeController.addFavorites, (req, res) => {
  res.status(200).send(res.locals.favorite);
});
module.exports = router;
