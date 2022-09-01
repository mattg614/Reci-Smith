import react from 'react';

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Container from '@mui/material/Container';
import StarIcon from '@mui/icons-material/Star';
import { useState, useEffect } from 'react';
import RecipeCard from '../RecipeCard';
import { Modal, Box } from '@mui/material';
import { Card, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const viewCustoms = props => {
  const { value } = props;
  const [recipes, getRecipes] = useState([]);
  useEffect(() => {
    const url = '/api/customs';
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
  }, [value]);
  // const [recipe, setFavorite] = useState(null);
  const [fav, setFavorite] = useState({});
  const [open, setOpen] = useState(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    console.log('handle close')
    setOpen(false);
  };
  const [openedRecipe, setOpenedRecipe] = useState({});
  const handleOpen = recipe => {
    console.log(recipe);
    setOpen(true);
    setOpenedRecipe(recipe);
  };
  const recipeEls = [];
  recipes.forEach((recipe) => {
    recipeEls.push(
      <Card variant="outlined">
        <Typography>
          {recipe.title}
        </Typography>
        <Typography>
          Ready in {recipe.readyInMinutes} minutes
        </Typography>
        <Typography>
          Serves {recipe.servings}
        </Typography>
        <IconButton
          onClick={(e) => {
            handleOpen(recipe);
          }} sx={{ color: 'rgba(0, 0, 0, 0.54)', mr: '5px' }}
          aria-label={`Details about ${recipe.title}`}>
          <InfoIcon />
        </IconButton>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400, height: '75%', overflow: 'scroll' }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            {/* <img
                      src={`${openedRecipe.image}`}
                      srcSet={`${openedRecipe.image}`}
                      alt={openedRecipe.title}
                      loading="lazy"
                    />
                    <h2 id="parent-modal-title">openedRecipe.title</h2>
                    <p id="parent-modal-description">
                              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p> */}
            <RecipeCard recipe={openedRecipe} />
          </Box>
        </Modal>
      </Card>
    );
  });
  return (
    <>
      {recipeEls}
    </>
  );
};





export default viewCustoms;