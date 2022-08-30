//this is only run for being able to populate the mongo db with the first entries
//subsequent hits to the recipe api will be handled in server / routes

const fetch = require('node-fetch');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const apiKey = 'c83a2bf3a31f4f5ba7de2db98305b3b2';
const dbName = 'SoloProjDB';
const url = 'mongodb://127.0.0.1:27017';
let db;
// const MONGO_URI =
//   'mongodb+srv://mgarza143:rNkCIx4wyMRnhSdG@cluster0.ko8muep.mongodb.net/?retryWrites=true&w=majority';
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
  cuisines: [String],

  ingredients: [
    {
      ingredientDescription: String,
    },
  ],
  instructions: [
    {
      steps: [
        {
          number: Number,
          step: String,
        },
      ],
    },
  ],
  spoonacularSourceURL: String,
});
const Recipe = mongoose.model('recipe', recipeSchema);
const customRecipe = mongoose.model('customRecipe', recipeSchema);

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

module.exports = { Recipe, customRecipe };
