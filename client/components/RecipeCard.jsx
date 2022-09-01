import React, { Component, useState, useEffect } from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import Button from '@mui/material/Button';
const RecipeCard = props => {
  const { recipe } = props;
  console.log(recipe.ingredients);
  const ingredients = recipe.ingredients;
  const ingredientsElement = [];
  ingredients.forEach((ingredient) => {
    ingredientsElement.push(
      <li>{ingredient}</li>
    );
  });
  const instructions = recipe.instructions;
  const instructionsElement = [];
  for (let i = 1; i < Object.keys(instructions).length + 1; i++) {
    instructionsElement.push(
      <li>{instructions[i]}</li>
    );
  }

  return (
    <section>
      <h3>{recipe.title}</h3>
      <img className= "recipeImage" src={recipe.image} alt={`${recipe.title} image`} />
      
      <h4>Ingredients: </h4>
      <ul className="ingredients">
        {ingredientsElement}
      </ul>
      <h4>Instructions: </h4>
      <ol className="instructions">
        {instructionsElement}
      </ol>
      
    </section>
  );
};

export default RecipeCard;