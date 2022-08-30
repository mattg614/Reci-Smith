const path = require('path');
const express = require('express');
const app = express();

//import routers

const PORT = 3000;

//request for static files

app.use(express.static(path.resolve(__dirname, '../client')));

// route handlers
app.use('/api', (req, res) => {
  console.log('api hit success');
  res.status(200).send('success');
});
//start the server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
