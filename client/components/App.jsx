import React, { Component } from 'react';
import Home from './Home';
import Create from './Create';
import Favorites from './Favorites';
import '../stylesheets/styles.css';
import NavBar from './NavBar';
const App = props => {
  return (
    <div>
      <NavBar />
      <Home />
    </div>
  );
};
export default App;