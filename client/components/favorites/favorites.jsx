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
import { Card, Tooltip } from '@mui/material';

const ViewFavorites = props => {
  const { value } = props;
  const [recipes, getRecipes] = useState([]);
  useEffect(() => {
    const url = '/api/favs';
    const fetchData = async () => {
      
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        getRecipes(json);
      } catch (error) {
        console.log('error', error);
      };
    };
    fetchData();
  }, [value]);
  console.log(recipes);
  // const [recipe, setFavorite] = useState(null);
  const [fav, setFavorite] = useState({});
  useEffect(() => {
    // const toggleFavorite = (e, orecipe) => {
    // console.log(e.target.style);
    console.log('inToggleFavorite');
    const newFavStatus = fav.favorited ? false : true;
    // newFavStatus ? e.target.style.fill = 'rgba(255, 255, 0, 0.99)' : e.target.style.fill ='rgba(200, 200, 200, 0.99)';
    // setFavorite(!recipe.favorited);
  
    const url = '/api/favs';
    const bodyToSend = JSON.stringify({
      _id: fav._id,
      collectionName: fav.collectionName,
      favorited: newFavStatus
    });
    fetch(url, {
      method: 'PATCH',
      body: bodyToSend,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((resp) => resp.json()).then((json) => {
      console.log(json);
      // getRecipes(json)
    });
    // };
  }, [fav]);
  return (
    <Container sx={{marginTop:10}}>

      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
        'repeat(auto-fill, minmax(300px, 1fr))!important'}}>
        {
          recipes.map(recipe => {    
            return(
              <Card key={recipe._id}>
                
                <ImageListItem sx={{ height: '100% !important' }}>
                  <ImageListItemBar
                    sx={{
                      background:
                        'rgba(0,0,0,0)'
                    }}
                    actionIcon={
                      <Tooltip title={'Click to Favorite'} sx={{ mr: '5px' }}>
                        <IconButton onClick={async (e) => {
                          await setFavorite(recipe);
                          console.log(recipe.favorited);
                        }} sx={{ color: `${recipe.favorited ? 'rgba(255, 255, 0, 0.99)' : 'rgba(200, 200, 200, 0.99)'}` }}>
                          <StarIcon />
                        </IconButton>
                      </Tooltip>
                    }
                    position='top'
                  />
                  <img
                    src={`${recipe.image}`}
                    srcSet={`${recipe.image}`}
                    alt={recipe.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={recipe.title}
                    sx={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7)100%, rgba(0,0,0,.3)50%, rgba(0,0,0,0)0%' }}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)', mr: '5px' }}
                        aria-label={`Details about ${recipe.title}`}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              </Card>
            );
          })
        }
      </ImageList>
    </Container>
  );
};





export default ViewFavorites;