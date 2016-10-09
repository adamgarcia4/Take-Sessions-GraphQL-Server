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


var getListLookup = {
	"User": "take-sessions-users",
	"Student": "take-sessions-students",
	"Teacher": "take-sessions-teachers",
	"Course": "take-sessions-courses",
	"CourseGroup": "take-sessions-coursegroup",
	"Session": "take-sessions-sessions",
	"Payment": "take-sessions-payments"
}

// Get List from Database
export function getDataList(tableName) {
	return new Promise(function (resolve, reject) {
		if (!(tableName in getListLookup)) {
			return reject(new Error("Invalid Table Name" + tableName));
		}
		console.log('querying database!');
		var params = {
			TableName: getListLookup[tableName]
		};
		docClient.scan(params, function (err, data) {
			if (err) return reject(err);
			console.log(data);
			return resolve(data["Items"]);
		});
	})
}

export function getDataListById(tableName, id) {
	return new Promise(function (resolve, reject) {
		if (!(tableName in getListLookup)) {
			return reject(new Error("Invalid Table Name" + tableName));
		}

		// console.log('querying database by ID!');

		var table = getListLookup[tableName];

		var RequestItems = {};

		RequestItems[table] = {
			Keys: []
		};

		for(var i=0; i <id.length; i++) {
			RequestItems[table]["Keys"][i] = {
				"_id": id[i]
			}
		}

		var params = {
			"RequestItems": RequestItems
		}

		// console.log('Params is: ', params)

		docClient.batchGet(params, function (err, data) {
			if (err) {
				console.log('err is: ', err);
				return reject(err);
			}

			console.log('data', data["Responses"][table]);
			return resolve(data["Responses"][table]);
		});
})
}

export function getDataById(tableName, id) {
	return new Promise(function (resolve, reject) {
		if (!(tableName in getListLookup)) {
			return reject(new Error("Invalid Table Name" + tableName));
		}
		console.log('querying database by ID!');
		
		var table = getListLookup[tableName];
		console.log(table);
		var params = {
			TableName: table,
			KeyConditionExpression: '#id = :idVal',
			ExpressionAttributeNames: {
				"#id": "_id"
			},
			ExpressionAttributeValues: {
				":idVal": id
			}
		};

		docClient.query(params, function (err, data) {
			if (err) {
				console.log('err is: ', err);
				return reject(err);
			}
			console.log('data', data);

			return resolve(data["Items"][0]);
		});
	})
}