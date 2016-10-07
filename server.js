//**************GraphQL Server Imports***************

// Uses import/export ES6 Module Notation

require('dotenv').config(); //Keep Config Variables out of code
import express from 'express'; //HTTP Handling
import bodyParser from 'body-parser'; //Parse Incoming request bodies
import {
  apolloExpress, //Barebones Apollo Server
  graphiqlExpress //Graphiql Interface
} from 'apollo-server';

//**************Schema Imports***************
import Schema from './schema';

const PORT = 3000; //Defines port number to serve application to
var app = express(); //Initialize Express Application

//**************Express Routes***************
app.use( //This route serves the graphql server
  '/graphql',
  bodyParser.json(),
  apolloExpress({
    schema: Schema
  })
);

app.use( //This route serves the Graphiql interface
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
)

//Set the app to listen for HTTP Requests
app.listen(PORT, () => console.log('Now go to port ' + PORT + '   POST /graphql or GET /graphiql'));