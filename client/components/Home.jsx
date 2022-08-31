import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';

const Home = props => {
  
  const [recipes, getRecipes] = useState([]);
  useEffect(() => {
    const url = '/api/';
    const fetchData = async () => {
      
      try {
        const response = await fetch(url);
        const json = await response.json();
        getRecipes(json);
      } catch (error) {
        console.log('error', error);
      };
    };
    fetchData();
  }, []);
  const recipeComponents = [];
  recipes.forEach((recipe) => {
    recipeComponents.push(
      <RecipeCard recipe={recipe} />
    );
  });
  return (
    <main>
      {recipeComponents}
    </main>
  );
};
export default Home;