//**************Schema Imports***************
import {
	// These are the basic GraphQL types
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull, //This is used to create required fields and arguments
	GraphQLSchema, 	//This is used to define the Schema
	GraphQLInputObjectType
} from 'graphql';

import { merge } from 'lodash';

import { // This contains all calls to be made to DynamoDB
	getDataList, //TODO: Get Caching working on Data List
	getBatchData,
	putData,
	updateData
} from './dynamodb';

import {
	createCourse
} from './course'

import {
	Course, resolvers as courseResolvers
} from './course/schema';

import {
	Teacher
} from './teacher/schema';

import { makeExecutableSchema } from 'graphql-tools';


// Faked Data can be imported from 'fakeData.js'

//**************Object Definitions********************

const schema = `
type Query {
	courses: [Course]
}
`;

const rootResolvers = {
	Query: {
		courses(root, {}, context) {
			// return getDataList('Course');
			return context.Course.getCourseList();
		}
	}
}
console.log('typedef', [schema, Course]);

const resolvers = merge(rootResolvers, courseResolvers);

export default makeExecutableSchema({
	typeDefs: [schema, Course, Teacher],
	resolvers: resolvers,
})

// const rootResolvers = {
// 	Query: {
// 		courses() {
// 			return getDataList('Course');
// 		}
// 	}
// }

// // const schema = [...rootSchema, ...courseSchema];
// const resolvers = rootResolvers;

// const executableSchema = makeExecutableSchema({
// 	typeDefs: [rootSchema, rootQuery],
// 	resolvers,
// });
// export default executableSchema;