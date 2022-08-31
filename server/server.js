const path = require('path');
const express = require('express');
const app = express();

//import routers

const PORT = 3000;
const apiRouter = require('./routes/api');
//request for static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));

// route handlers
app.use('/api', apiRouter);

//catch all other handlers
app.use((req, res) =>
  // eslint-disable-next-line quotes
  res.status(404).send("This is not the recipe you're looking for...")
);

//error handler

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//start the server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
