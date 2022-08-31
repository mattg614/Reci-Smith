//this is only run for being able to populate the mongo db with the first entries
//subsequent hits to the recipe api will be handled in server / routes

const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const dbName = 'SoloProjDB';
const url = 'mongodb://127.0.0.1:27017';

const MONGO_URI = 'mongodb://127.0.0.1:27017';
mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'SoloProjDB',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;
const recipeSchema = new Schema({
  title: String,
  spoonacularId: Number,
  readyInMinutes: Number,
  servings: Number,
  sourceUrl: String,
  image: String,
  imageType: String,
  cuisine: [String],

  ingredients: [String],
  instructions: {},
  spoonacularSourceURL: String,
});
const cuisineRecipeSchema = new Schema({
  title: String,
  spoonacularId: Number,
  readyInMinutes: Number,
  servings: Number,
  sourceUrl: String,
  image: String,
  imageType: String,
  cuisine: String,

  ingredients: [String],
  instructions: {},
  spoonacularSourceURL: String,
});
const customRecipeSchema = new Schema({
  title: String,
  readyInMinutes: Number,
  servings: Number,
  sourceUrl: String,
  image: String,
  imageType: String,
  cuisine: String,

  ingredients: [String],
  instructions: {},
});
const Recipe = mongoose.model('recipe', cuisineRecipeSchema);
const customRecipe = mongoose.model('customRecipe', customRecipeSchema);
const randomRecipe = mongoose.model('randomRecipe', recipeSchema);
/*
"recipes" : [
  {
    "extendedIngredients": [
      {"original" : "ingredient string"}
    ],
    "id" : "recipe id number",
    "title" : "recipe title string",
    "readyInMinutes" : "recipe time to make in mins number",
    "servings": "recipe serves x number of people number",
    "source URL": "recipe source url",
    "image" : "recipe image",
    "image type" : "recipe image type",
    "cuisines" : [Array of recipe cuisine strings],
    "analyzedInstructions" : [
      {
        "steps" : [
          {"number" : "step number", 
          "step": "String with instructions" }
        ]
      }
    ],
    "spoonacularSourceURL" : "source url from spoonacular"
  }
]
*/

module.exports = { Recipe, customRecipe, randomRecipe };
