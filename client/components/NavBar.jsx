import React, { Component } from 'react';
import { AppBar,Box, Container, IconButton, Toolbar, Typography } from '@mui/material'
import { Home, Star } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import AllRecipes from './home/Home';
import Favorites from './favorites/favorites';
import ViewCustoms from './viewCustoms/viewCustoms';
import AddCustoms from './addCustom/addCustom';
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.setValue = this.setValue.bind(this);
  }
  setValue(v) {
    this.setState({
      value: v,
    });
  }



  render() {
    return (
      <>
        <AppBar>
          <Container >
            <Toolbar disableGutters>

              <Typography
                variant='h6'
                component='h1'
                noWrap
                sx={{ flexGrow: 1, display: 'flex' }}
              >
                ReciSmith
              </Typography>
              <Box sx={{ mr: 1, }}>
                <IconButton onClick={(e) => this.setValue(0)}>
                  <Home />
                </IconButton>
              </Box>
              <Box sx={{ mr: 1, }}>
                <IconButton onClick={(e) => this.setValue(1)}>
                  <Star />
                </IconButton>
              </Box>
              <Box sx={{ mr: 1, }}>
                <Button variant="contained" size="medium" onClick={(e) => this.setValue(2)}>View Customs</Button>
              </Box>
              <Box sx={{ mr: 1, }}>
                <Button variant="contained" size="medium" onClick={(e) => this.setValue(3)}>Add Custom</Button>
              </Box>

            </Toolbar>
          </Container>

        </AppBar>
        <Toolbar />
        {
          {
            0: <AllRecipes value={this.state.value} />,
            1: <Favorites value={this.state.value}  />,
            2: <ViewCustoms value={this.state.value}  />,
            3: <AddCustoms value={this.state.value} />
          }[this.state.value]
        }
      </>
    );
  }
};
export default NavBar;