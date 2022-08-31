const models = require('../models/recipesModels');
const fetch = require('node-fetch');

const { Recipe, customRecipe, randomRecipe } = models;
const fs = require('fs');
const path = require('path');
const { apiKEY } = require('../../keys/keys');

const jsonContents = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './postmanPulls/random200.json'))
);
// const cuisine = 'chinese';
// const cuisine = 'british';

// const spoonacularResult = await fetch(url);
// const recipesJSON = await spoonacularResult.json();
jsonContents.recipes.forEach((recipe) => {
  // let recipe = testContents.recipes[0];
  console.log(recipe);
  let instructions;
  let ingredients;
  if (recipe.analyzedInstructions[0] === undefined) {
    instructions = { 0: 'No instructions provided' };
  } else {
    instructions = recipe.analyzedInstructions[0].steps.reduce((acc, next) => {
      const stepNumber = next.number;
      acc[stepNumber] = next.step;
      return acc;
    }, {});
  }
  if (recipe.extendedIngredients[0] === undefined) {
    ingredients = ['No ingredients provided'];
  } else {
    ingredients = recipe.extendedIngredients.reduce((acc, next) => {
      acc.push(next.original);
      return acc;
    }, []);
  }
  randomRecipe.create(
    {
      title: recipe.title,
      spoonacularId: recipe.id,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      sourceUrl: recipe.sourceUrl,
      image: recipe.image,
      imageType: recipe.imageType,
      cuisine: recipe.cuisines,
      ingredients: ingredients,
      instructions: instructions,
      spoonacularSourceURL: recipe.spoonacularSourceUrl,
    },
    (err, recipeRes) => {
      if (err) {
        console.log('Err trying to populate database');
      }
      console.log(recipeRes);
    }
  );
});

const uri = `https://api.spoonacular.com/recipes/random?number=10&tags=american&apiKey=${apiKEY}`;

// const baseSpoonacularURL = 'https://api.spoonacular.com/recipes/';
// const spoonacularQuery = 'random';
// const requestNumber = 'number=90';
// const tags = 'tags=american';
// const apiKey = `apiKey=${apiKey}`;
// const cuisines = [
//   'African',
//   'British',
//   'Cajun',
//   'Caribbean',
//   'Chinese',
//   'Eastern European',
//   'European',
//   'French',
// ];
// // cuisines.forEach((cuisine) => {
// const cuisine = 'British';
// const url =
//   baseSpoonacularURL + spoonacularQuery + '?' + requestNumber + '&' + tags;
// '&' + apiKey;
// const cuisines = ['german', 'greek', 'indian', 'irish', 'italian', 'japanese', 'jewish', 'korean'];
// const cuisine = 'italian';
// buildDB(cuisine);
// });
// customRecipe.create(
//   {
//     title: 'Asian Salmon Burgers With Tangy Ginger Lime Sauce',
//     spoonacularId: 632874,
//     readyInMinutes: 30,
//     servings: 4,
//     sourceUrl:
//       'http://www.foodista.com/recipe/FRT38YTC/asian-salmon-burgers-with-tangy-ginger-lime-sauce',
//     image: 'https://spoonacular.com/recipeImages/632874-556x370.jpg',
//     imageType: 'jpg',
//     cuisines: ['American'],
//     ingredients: [
//       {
//         ingredientDescription: '4 burger buns',
//       },
//       {
//         ingredientDescription:
//           '1 tablespoon Fresh Basil, Chopped (about 5 leaves worth)',
//       },
//       {
//         ingredientDescription: '1 clove Garlic',
//       },
//       {
//         ingredientDescription: '1 Green Onion, Chopped',
//       },
//       {
//         ingredientDescription: '1/4 Lime, Juiced',
//       },
//       {
//         ingredientDescription: '1/4 cup Mayonnaise',
//       },
//       {
//         ingredientDescription: '1 teaspoon Oyster Sauce',
//       },
//       {
//         ingredientDescription: '1/2 teaspoon Powdered Ginger',
//       },
//       {
//         ingredientDescription: '1 pound Salmon',
//       },
//       {
//         ingredientDescription: '5 1/2 tablespoons Sesame Oil',
//       },
//       {
//         ingredientDescription: '2 tablespoons Sour Cream',
//       },
//       {
//         ingredientDescription: '1 tablespoon Soy Sauce',
//       },
//     ],
//     instructions: [
//       {
//         steps: [
//           {
//             number: 1,
//             step: 'Cut the salmon into large hunks and run it through a food processor until no large pieces remain.',
//           },
//           {
//             number: 2,
//             step: 'Add to the salmon the soy sauce, garlic, ginger, oyster sauce, green onion, and basil.',
//           },
//           {
//             number: 3,
//             step: 'Combine ingredients well and form 4 large patties from mixture.',
//           },
//           {
//             number: 4,
//             step: 'Heat up the sesame oil in a large frying pan on medium high heat and add in the patties. Cook for about 10 minutes flipping once half way through.To make the sauce, add together all the above listed ingredients and stir to combine.',
//           },
//           {
//             number: 5,
//             step: 'Pour a spoonful of sauce over the top of the finished salmon burger and serve inside a toasted bun.',
//           },
//         ],
//       },
//     ],
//     spoonacularSourceURL:
//       'https://spoonacular.com/asian-salmon-burgers-with-tangy-ginger-lime-sauce-632874',
//   },
//   (err, recipe) => {
//     if (err) {
//       console.log('Err trying to populate database');
//     }
//     console.log(recipe);
//   }
// );
