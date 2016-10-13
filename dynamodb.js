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

var DataLoader = require('dataloader');

var userLoader = new DataLoader(keys => getFromDatabase('User', keys));
var studentLoader = new DataLoader(keys => getFromDatabase('Student', keys));
var teacherLoader = new DataLoader(keys => getFromDatabase('Teacher', keys));
var courseLoader = new DataLoader(keys => getFromDatabase('Course', keys));
var courseGroupLoader = new DataLoader(keys => getFromDatabase('CourseGroup', keys));
var sessionLoader = new DataLoader(keys => getFromDatabase('Session', keys));
var paymentLoader = new DataLoader(keys => getFromDatabase('Payment', keys));

var getListLookup = {
	"User": {
		table: "take-sessions-users",
		loader: userLoader
	},
	"Student": {
		table: "take-sessions-students",
		loader: studentLoader
	},
	"Teacher": {
		table: "take-sessions-teachers",
		loader: teacherLoader
	},
	"Course": {
		table: "take-sessions-courses",
		loader: courseLoader
	},
	"CourseGroup": {
		table: "take-sessions-coursegroup",
		loader: courseGroupLoader
	},
	"Session": {
		table: "take-sessions-sessions",
		loader: sessionLoader
	},
	"Payment": {
		table: "take-sessions-payments",
		loader: paymentLoader
	}
};

export function getBatchData(modelName, idList) {
	console.log('inside getbatchData', idList);

	if (!Array.isArray(idList)) { // If the ID list is of the form <_id>, one call to data loader is sufficient
			console.log('single', idList);
			return getListLookup[modelName].loader.load(idList);
	} else { // The ID list is of the form <<_id>>, and as such it needs to be broken into single <_id> calls to data loader
		var iterArr = [];
		for (var i = 0; i < idList.length; i++) {
			iterArr.push(getListLookup[modelName].loader.load(idList[i]));
		}
		console.log('multiple', iterArr);
		// Returns a promise that resolves once all of the individual promises in the array is resolved.
		return Promise.all(iterArr);
	}
}

// <_id> input --> Promise <val> output
export function getFromDatabase(modelName, id) {
	return new Promise(function (resolve, reject) {
		if (getListLookup[modelName].table == undefined) {
			return reject(new Error("Invalid Table Name"));
		}
		var table = getListLookup[modelName].table;

		// Build up Params List
		var RequestItems = {};
		RequestItems[table] = {
			Keys: []
		};
		for (var i = 0; i < id.length; i++) {
			RequestItems[table]["Keys"][i] = {
				"_id": id[i]
			}
		}
		var params = {
			"RequestItems": RequestItems
		}

		// Send request to DynamoDB server
		docClient.batchGet(params, function (err, data) {
			if (err) {
				console.log('err is: ', err);
				return reject(err);
			}
			console.log('data', data["Responses"][table]);
			if(data["Responses"][table].length == 0) {
				// Even if no results, DataLoader needs to return a promise for an Array of Same Length as input
				return resolve(Array.apply(null, Array(id.length).map(Number.prototype.valueOf,null)));
			} else {
				return resolve(data["Responses"][table]);
			}
		});
	})
}

// Get List from Database | TODO: Enable Caching on this
export function getDataList(tableName) {
	return new Promise(function (resolve, reject) {
		if (!(tableName in getListLookup)) {
			return reject(new Error("Invalid Table Name" + tableName));
		}
		console.log('querying database!');
		var params = {
			TableName: getListLookup[tableName].table
		};
		docClient.scan(params, function (err, data) {
			if (err) return reject(err);
			console.log(data);
			return resolve(data["Items"]);
		});
	})
}