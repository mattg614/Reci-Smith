import React from 'react';
import { AppBar,Box, Container, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material';
const NavBar = () => {
  return (
    <AppBar>
      <Container >
        <Toolbar disableGutters>
          <Box sx={{ mr: 1, }}>
            <IconButton>
              <Menu />
            </IconButton>
          </Box>
          <Typography
            variant='h6'
            component='h1'
            noWrap
            sx={{ flexGrow: 1, display: 'flex' }}
          >
            ReciSmith
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;