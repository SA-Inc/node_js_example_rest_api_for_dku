'use strict';

const configs = require(__dirname + '/api/configs/config.json');

const express = require('express');
const bodyParser = require('body-parser');
const notesRoutes = require(__dirname + '/api/routes/notes.js');

// App Init.
const app = express();
const serverPort = configs.port;



app.use(bodyParser.urlencoded({
   extended: false,
}));
app.use(bodyParser.json());
app.use('/api', notesRoutes);



app.listen(serverPort, (err) => {
   if (err) {
      console.error(`Something went wrong. Error: ${err}`);
   }
   
   console.log(`Server listening on port: ${serverPort}`);
});
