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

//**************Model/Resolver Imports***************
import {
	Course, CourseInput, resolvers as courseResolvers
} from './course/schema';

import {
	Teacher
} from './teacher/schema';

import {
	CourseGroup
} from './courseGroup/schema';


// import {
// 	createCourse
// } from './course'

//**************GraphQL-Tool Imports***************
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

//**************Root Object Definitions********************

const schema = `
type Query {
	courses: [Course]
	course( _id: String! ): Course
	teachers: [Teacher]
	teacher( _id: String! ): Teacher
}

type Mutation {
	createCourse( course: CourseInput ): Course
}

schema {
	query: Query
	mutation: Mutation
}
`;

const rootResolvers = {
	Query: {
		courses(root, { }, context) {
			return context.Course.getList();
		},
		course(root, { _id }, context) {
			console.log('id is: ', _id);
			return context.Course.getById(_id);
		},
		teachers(root, { }, context) {
			return context.Teacher.getList();
		},
		teacher(root, { _id }, context) {
			console.log('id is: ', _id);
			return context.Teacher.getById(_id);
		},

	},
	Mutation: {
		createCourse(root, { course }, context) {
			return context.Course.createCourse(course);
		}
	}
}
// console.log('typedef', [schema, Course]);

//**************Combined Resolver Definition********************
const resolvers = merge(rootResolvers, courseResolvers);


//**************Create Root Schema********************
export default makeExecutableSchema({
	typeDefs: [schema, Course, CourseInput, Teacher, CourseGroup],
	resolvers: resolvers,
})
