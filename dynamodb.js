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

var userLoader = new DataLoader(keys => getBatchData('User', keys));
// var studentLoader = new DataLoader(keys => getBatchStudents(keys));
// var teacherLoader = new DataLoader(keys => getBatchTeachers(keys));
// var courseLoader = new DataLoader(keys => getBatchCourses(keys));
// var courseGroupLoader = new DataLoader(keys => getBatchCourseGroups(keys));
// var sessionLoader = new DataLoader(keys => getBatchSessions(keys));
// var paymentLoader = new DataLoader(keys => getBatchPayments(keys));

var getListLookup = {
	"User": {
		table: "take-sessions-users",
		loader: userLoader
	},
	"Student": {
		table: "take-sessions-students",
		// loader: studentLoader
	},
	"Teacher": {
		table: "take-sessions-teachers",
		// loader: teacherLoader
	},
	"Course": {
		table: "take-sessions-courses",
		// loader: courseLoader
	},
	"CourseGroup": {
		table: "take-sessions-coursegroup",
		// loader: courseGroupLoader
	},
	"Session": {
		table: "take-sessions-sessions",
		// loader: sessionLoader
	},
	"Payment": {
		table: "take-sessions-payments",
		// loader: paymentLoader
	}
};

export function getBatchUsers(modelName, idList) {
	console.log('inside getbatchusers');
	console.log(idList, idList.length);

	if (!Array.isArray(idList)) {
		// return new Promise(function (resolve, reject) {
			console.log('single');
			return getListLookup[modelName].loader.load(idList);
			// var iterArr = [
			// 	getListLookup[modelName].loader.load(idList)
			// ];
			// return Promise.all(iterArr);
		
		
	} else {
		console.log('array')
		var iterArr = [];
		// ID list is already passed into here
		for (var i = 0; i < idList.length; i++) {
			// console.log('model name is: ', getListLookup[modelName]);
			// console.log('loader is: ', modelName.loader);
			iterArr.push(getListLookup[modelName].loader.load(idList[i]));
			// console.log(iterArr);
		}
		// console.log('iter arr is', iterArr);
		return Promise.all(iterArr);
	}





	// return getBatchData('User', idList);
	// return getDataListById('User', idList);

	//has to export a promise for an array of values (Values can be arrays of other values)
}

export function getBatchCourseGroups(idList) {
	return getDataListById('CourseGroup', idList);
}
export function getBatchSessions(idList) {
	return getDataListById('Session', idList);
}
export function getBatchPayments(idList) {
	return getDataListById('Payment', idList);
}

// <_id> input --> Promise <val> output
export function getBatchData(modelName, id) {
	return new Promise(function (resolve, reject) {
		// console.log('testing');
		// console.log(modelName);
		// console.log(getListLookup[modelName]);
		if (getListLookup[modelName].table == undefined) {
			return reject(new Error("Invalid Table Name"));
		}

		console.log('idList is: ', id);

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


// Get List from Database
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

export function getDataById(tableParams) {

	return new Promise(function (resolve, reject) {
		if (!(tableParams.tableName in getListLookup)) {
			return reject(new Error("Invalid Table Name" + tableName));
		}
		console.log('querying database by ID!');

		var table = getListLookup[tableParams.tableName];
		var id = tableParams.id;
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