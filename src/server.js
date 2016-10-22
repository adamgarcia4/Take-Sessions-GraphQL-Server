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
import executableSchema from './schema';

import { DynamoDBConnector } from './dynamodb';

import { Course } from './course/models';
import { Teacher } from './teacher/models';

const PORT = 3000; //Defines port number to serve application to
var app = express(); //Initialize Express Application

var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true })); //TODO: Comment
app.use(bodyParser.json()); //TODO: Comment

//**************Express Routes***************


app.use('/graphql', apolloExpress((req) => {

  const query = req.query.query || req.body.query; // This is how express-graphql gets query.  https://github.com/graphql/express-graphql/blob/3fa6e68582d6d933d37fa9e841da5d2aa39261cd/src/index.js#L257
  if (query && query.length > 2000) {
    //No queries are going to be this long.
    throw new Error('Query too large.');
  }

  //Create new instance of the dynamodb connector 
  const dynamoDBConnector = new DynamoDBConnector(); //TODO: Does this circumvent caching because it will create new instances of DynamoDB per request?

  //TODO: Add user validation checking
  console.log('working start!');
  return {
    // schema: Schema
    schema: executableSchema,
    context: { //Pass in all models to be used anywhere along the resolve tree.  Passed to resolve on compile time.
      Course: new Course({ connector: dynamoDBConnector }),
      Teacher: new Teacher({ connector: dynamoDBConnector }),
    },
  };

}));

app.use( //This route serves the Graphiql interface
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
)

//Set the app to listen for HTTP Requests
app.listen(PORT, () => console.log('Now go to port ' + PORT + '   POST /graphql or GET /graphiql'));
