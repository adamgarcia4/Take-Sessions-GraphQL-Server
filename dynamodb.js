//**************Imports***************

import Promise from 'bluebird'; //Promise Support for resolves
import AWS from 'aws-sdk'; //AWS DynamoDB Integration

//Reference: https://github.com/serverless/serverless-graphql-blog/blob/master/blog/lib/dynamo.js

// Configure DynamoDB Credentials
const dynamoConfig = {
    region: 'us-west-2',
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY
}; //TODO: Can a sessionID be used instead?

const docClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);

// Student Resolvers
export function getStudents() {
    return new Promise(function (resolve, reject) {
        console.log('querying database!');
        var params = {
            TableName: 'take-sessions-students'
        };
        docClient.scan(params, function(err, data) {
            if(err) return reject(err);
            console.log(data);
            return resolve(data["Items"]);
        });
    })
}

export function getStudent(id) {
    return new Promise(function (resolve, reject) {
        console.log('querying database!');
        var params = {
            TableName: 'take-sessions-students',
            // Key: {
            //     _id: id
            // }
            KeyConditionExpression: id
        };
        docClient.query(params, function(err, data) {
            if(err) return reject(err);
            console.log(data);
            return resolve(data["Item"]);
        });
    })
}


// Course Resolvers
export function getCourses() {
    return new Promise(function (resolve, reject) {
        console.log('querying database!');
        var params = {
            TableName: 'take-sessions-courses'
        };
        docClient.scan(params, function(err, data) {
            if(err) return reject(err);
            console.log(data);
            return resolve(data["Items"]);
        });
    })
}

//     var params = {
//       TableName: postsTable,
//       AttributesToGet: [
//         'id',
//         'title',
//         'author',
//         'bodyContent'
//       ]
//     };

//     docClient.scan(params, function(err, data) {
//       if (err) return reject(err);
//       return resolve(data["Items"]);
//     });

//   });



// export function createPost(post) {
//   return new Promise(function(resolve, reject) {
//     var params = {
//       TableName: postsTable,
//       Item: post
//     };

//     docClient.put(params, function(err, data) {
//       if (err) return reject(err);
//       return resolve(post);
//     });

//   });
// }



// docClient.get(params, function (err, data) {
//     if (err) {
//         console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
//     } else {
//         console.log('Added item:', JSON.stringify(data, null, 2));
//     }
// });

// const stage = process.env.SERVERLESS_STAGE;
// const projectName = process.env.SERVERLESS_PROJECT;
// const postsTable = projectName + '-posts-' + stage;
// const authorsTable = projectName + '-authors-' + stage;
// const commentsTable = projectName + '-comments-' + stage;



// export function getPosts() {
//   return new Promise(function(resolve, reject) {
//     var params = {
//       TableName: postsTable,
//       AttributesToGet: [
//         'id',
//         'title',
//         'author',
//         'bodyContent'
//       ]
//     };

//     docClient.scan(params, function(err, data) {
//       if (err) return reject(err);
//       return resolve(data["Items"]);
//     });

//   });
// }

// export function getAuthor(id) {
//   return new Promise(function(resolve, reject) {
//     var params = {
//       TableName: authorsTable,
//       Key: {
//         id: id
//       },
//       AttributesToGet: [
//         'id',
//         'name'
//       ]
//     };

//     docClient.get(params, function(err, data) {
//       if (err) return reject(err);
//       return resolve(data["Item"]);
//     });

//   });
// }

// export function getAuthors() {
//   return new Promise(function(resolve, reject) {
//     var params = {
//       TableName: authorsTable,
//       AttributesToGet: [
//         'id',
//         'name'
//       ]
//     };

//     docClient.scan(params, function(err, data) {
//       if (err) return reject(err);
//       return resolve(data["Items"]);
//     });

//   });
// }

// export function getComments() {
//   return new Promise(function(resolve, reject) {
//     var params = {
//       TableName: commentsTable,
//       AttributesToGet: [
//         'id',
//         'content',
//         'author'
//       ]
//     };

//     docClient.scan(params, function(err, data) {
//       if (err) return reject(err);
//       return resolve(data["Items"]);
//     });

//   });
// }