# Take Sessions (Backend GraphQL Server)

## Motivation for Startup
To provide an end-to-end service to sustain musicians by providing a stream of students to teach, branding opportunities, and a full-service organizational package to help musicians achieve their dreams.

I acted as the Lead Software Engineer for approximately 4 months where I designed the database structure, and build out the infrastructure.

## Overall Software Architecture
[embed]https://www.docdroid.net/9KGj2dk/untitled-diagram.pdf[/embed]




## Database Layer
For technical and cost reasons, a decision was made to utilize two databases.  Therefore, a need arose to develop database abstractions.

### DynamoDB (https://goo.gl/qF57Lu)
Leveraged Facebook's DataLoader node.js module to front the DynamoDB layer by adding smart Batching & Caching techniques.
The Caching Layer proved valuable so as to deliver data quickly without having to expend a round-trip request to AWS.

The database was designed to be a fully Promise-based solution.  This further abstracted async complexities.  I designed the CRUD functionalities as the application implementation required.

### MongoDB (https://goo.gl/9jvtQR)
Created MongoDB wrapper to obscure any low-level API database calls.  Also, this database wrapper complies to a promise implementation.



## Technology Used

    "apollo-server": "^0.3.2",
    "aws-sdk": "^2.6.6",
    "bluebird": "^3.4.6",
    "body-parser": "^1.15.2",
    "cors": "^2.8.1",
    "dataloader": "^1.2.0",
    "dotenv": "^2.0.0",
    "express": "^4.14.0",
    "express-graphql": "^0.5.4",
    "graphql": "^0.7.1",
    "graphql-tools": "^0.7.2",
    "lodash": "^4.16.4",
    "mongoose": "^4.6.5",
    "node-uuid": "^1.4.7"


- Backend
  - Node.js Programming Language
  - Express.js Web Application Framework
- Frontend
  - Jquery for Single Page Application functionality
  - Bootstrap CSS framework

## Technologies
- NodeJS/ Express JS backend
- Handlebars Templating
- Passport.js User Authentication
- Socket.io Session Handling for real-time chatroom online status
- AWS S3 storage for all media uploads
- Speechmatics API usage for Conversation analysis
- Heroku hosting
