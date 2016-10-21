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
	schema as courseSchema
} from './course/schema';

import { makeExecutableSchema } from 'graphql-tools';


// Faked Data can be imported from 'fakeData.js'

//**************Object Definitions********************

const schema = `
type Course {
	_id: String!
	name: String
	genre: String
	pic: String
	price: Int
	calendarID: String
	bio: String
	location: String
	material: String
}

type Query {
	courses: [Course]
}
`;

const rootResolvers = {
	Query: {
		courses() {
			return getDataList('Course');
		}
	}
}

export default makeExecutableSchema({
	typeDefs: schema,
	resolvers: rootResolvers,
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