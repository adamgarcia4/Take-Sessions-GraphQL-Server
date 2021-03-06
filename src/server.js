//**************GraphQL Server Imports***************

// Uses import/export ES6 Module Notation

//Keep Config Variables out of code
require('dotenv').config();

//HTTP Handling
import express from 'express';

//Parse Incoming request bodies
import bodyParser from 'body-parser';


// Import Apollo Server related Modules 
import {
  //Barebones Apollo Server
  apolloExpress,

  //Graphiql Interface
  graphiqlExpress

} from 'apollo-server';


//**************Schema Imports***************

import Schema from './schema';
import executableSchema from './schema';


//**************Database Connector Imports***************

import { DynamoDBConnector } from './dynamodb';
import { MongoDBConnector } from './mongoConnector';

//**************Model Imports***************

import { Course } from './course/models';
import { Teacher } from './teacher/models';
import { CourseGroup } from './courseGroup/models';
import { User } from './user/models';
import { Student } from './student/models';
import { Session } from './session/models';
import { Payment } from './payment/models';


//Defines port number to serve application to
const PORT = 3000;

 //Initialize Express Application
var app = express();


//**************Express Middleware***************

// CORS Middleware to support Cross Origin Requests
var cors = require('cors');
app.use(cors());

//Body Parser Middleware populates URL encoded strings into req.body 
app.use(bodyParser.urlencoded({ extended: true }));

//Body Parser Middleware accepts JSON and makes it accesible to req.body
app.use(bodyParser.json());


//**************Express Routes***************

// Route to parse requests from Clients
app.use('/graphql', apolloExpress((req) => {

  // This is how express-graphql gets query.  https://github.com/graphql/express-graphql/blob/3fa6e68582d6d933d37fa9e841da5d2aa39261cd/src/index.js#L257
  const query = req.query.query || req.body.query;

  // Attempt to provide errors from harmful requests
  if (query && query.length > 2000) {
    throw new Error('Query too large.');
  }

  //Create new instance of the dynamodb connector 

  // const modelList = {
  //   'Course': 'courses',
  //   'User': 'users'
  // }

  // const dynamoDBConnector = new DynamoDBConnector(); //TODO: Does this circumvent caching because it will create new instances of DynamoDB per request?
  const mongoDBConnector = new MongoDBConnector();

  //TODO: Add user validation checking
  
  console.log('working start!');
  
  //Return the Schema and Context to the Apollo Client for use inside of body of request
  return {
    schema: executableSchema,

    //Pass in all models to be used anywhere along the resolve tree.  Passed to resolve on compile time.
    context: { 
      // Course: new Course({ connector: dynamoDBConnector }),
      Course: new Course({ connector: mongoDBConnector }),
      Teacher: new Teacher({ connector: mongoDBConnector }),
      CourseGroup: new CourseGroup({ connector: mongoDBConnector }),
      User: new User({ connector: mongoDBConnector }),
      Student: new Student({ connector: mongoDBConnector }),
      Session: new Session({ connector: mongoDBConnector }),
      Payment: new Session({ connector: mongoDBConnector }),
    },
  };

}));

// Route to accept graphiQL queries
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
)

// app.get('/test', function (req, res) {
//   const mongoDBConnector = new MongoDBConnector();
//   mongoDB
// });

//Set the app to listen for HTTP Requests
app.listen(PORT, () => console.log('Now go to port ' + PORT + '   POST /graphql or GET /graphiql'));
