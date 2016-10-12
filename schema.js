//**************Schema Imports***************
import {
	// These are the basic GraphQL types
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull, //This is used to create required fields and arguments
	GraphQLSchema 	//This is used to define the Schema
} from 'graphql';

import { // This contains all calls to DynamoDB
	getDataList,
	// getDataListById,
	// getDataById,
	// getBatchUsers,
	// getBatchStudents,
	// getBatchTeachers,
	// getBatchCourses,
	// getBatchCourseGroups,
	// getBatchSessions,
	// getBatchPayments,
	getBatchData
} from './dynamodb';

import {
	coursesList,
	teachersList
} from './fakeData';

// Faked Data can be imported from 'fakeData.js'

var DataLoader = require('dataloader');

// var userLoader = new DataLoader(keys => getBatchUsers(keys));
// var studentLoader = new DataLoader(keys => getBatchStudents(keys));
// var teacherLoader = new DataLoader(keys => getBatchTeachers(keys));
// var courseLoader = new DataLoader(keys => getBatchCourses(keys));
// var courseGroupLoader = new DataLoader(keys => getBatchCourseGroups(keys));
// var sessionLoader = new DataLoader(keys => getBatchSessions(keys));
// var paymentLoader = new DataLoader(keys => getBatchPayments(keys));

//**************Object Definitions********************

const User = new GraphQLObjectType({
	name: 'User',
	description: 'This represents a single User',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		name: { type: GraphQLString },
		student: {
			type: Student,
			resolve: function (user) {
				return getBatchData('Student', user.studentID);
			}
		},
		teacher: {
			type: Teacher,
			resolve: function (user) {
				return getBatchData('Teacher', user.teacherID);
			}
		}
	})
});

const Student = new GraphQLObjectType({
	name: 'Student',
	description: 'This represents a Student Account',
	fields: () => ({
		_id: { type: GraphQLString },
		name: {type: GraphQLString },
		user: {
			type: User,
			resolve: function (student) {
				return getBatchData('User', student.userID);
			}
		},
		courseGroup: {
			type: new GraphQLList(CourseGroup),
			resolve: function (student) {
				return getBatchData('CourseGroup', student.courseGroupID);
			}
		}
	})
});

const Teacher = new GraphQLObjectType({
	name: 'Teacher',
	description: 'This represents a teacher',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		genre: { type: GraphQLString },
		user: {
			type: User,
			resolve: function (teacher) {
				return getBatchData('User', teacher.userID);
			}
		},
		courses: {
			type: new GraphQLList(Course),
			resolve: function (teacher) {
				return getBatchData('Course', teacher.courseID);
			}
		},
		courseGroup: {
			type: new GraphQLList(CourseGroup),
			resolve: function (teacher) {
				return getBatchData('CourseGroup', teacher.courseGroupID);
			}
		}
	})
});

const Course = new GraphQLObjectType({
	name: 'Course',
	description: 'This represents a teacher\'s course',
	fields: () => ({
		_id: { type: GraphQLString },
		name: { type: GraphQLString },
        genre: { type: GraphQLString },
        pic: { type: GraphQLString },
        price: { type: GraphQLInt },
        calendarID: { type: GraphQLString },
        bio: { type: GraphQLString },
        location: { type: GraphQLString },
        material: { type: GraphQLString },
		teacher: {
			type: new GraphQLList(Teacher),
			resolve: function (course) {
				return getBatchData('Teacher', course.teacherID);
			}
		},
		courseGroup: {
			type: new GraphQLList(CourseGroup),
			resolve: function (course) {
				return getBatchData('CourseGroup', course.courseGroupID);
			}
		}
	})
});

const CourseGroup = new GraphQLObjectType({
	name: 'CourseGroup',
	description: 'This shows the instance of a Course Group',
	fields: () => ({
		_id: { type: GraphQLString },
		course: {
			type: Course,
			resolve: function (courseGroup) {
				return getBatchData('Course', courseGroup.courseID);
			}
		},
		student: {
			type: new GraphQLList(Student),
			resolve: function (courseGroup) {
				return getBatchData('Student', courseGroup.studentID);
			}
		},
		teacher: {
			type: new GraphQLList(Teacher),
			resolve: function (courseGroup) {
				return getBatchData('Teacher', courseGroup.teacherID);
			}
		},
		session: {
			type: new GraphQLList(Session),
			resolve: function (courseGroup) {
				return getBatchData('Session', courseGroup.sessionID);
			}
		}
	})
});

const Session = new GraphQLObjectType({
	name: 'Session',
	description: 'This represents a single Session',
	fields: () => ({
		_id: { type: GraphQLString },
		courseGroup: {
			type: CourseGroup,
			resolve: function (session) {
				return getBatchData('CourseGroup', session.courseGroupID);
			}
		},
		payment: {
			type: new GraphQLList(Payment),
			resolve: function (session) {
				return getBatchData('Payment', session.paymentID);
			}
		}
	})
});

const Payment = new GraphQLObjectType({
	name: 'Payment',
	description: 'This represents a single Payment',
	fields: () => ({
		_id: { type: GraphQLString },
		session: {
			type: Session,
			resolve: function (payment) {
				return getBatchData('Session', payment.sessionID);
			}
		}

	})
});

//**************Root Query Definition********************

const Query = new GraphQLObjectType({
	name: 'BlogSchema',
	description: 'Root of the Blog Schema',
	fields: () => ({
		users: {
			type: new GraphQLList(User),
			resolve: function () {
				// return getUsers('take-sessions-users');
				return getDataList('User');
			}
		},
		students: {
			type: new GraphQLList(Student),
			resolve: function () {
				return getDataList('Student');
			}
		},
		teachers: {
			type: new GraphQLList(Teacher),
			resolve: function () {
				// return teachersList;
				return getDataList('Teacher');
			}
		},
		courses: {
			type: new GraphQLList(Course),
			resolve: function () {
                return getDataList('Course');
			}
		},
		courseGroup: {
			type: new GraphQLList(CourseGroup),
			resolve: function () {
				return getDataList('CourseGroup');
			}
		},
		sessions: {
			type: new GraphQLList(Session),
			resolve: function () {
				return getDataList('Session');
			}
		},
		payments: {
			type: new GraphQLList(Payment),
			resolve: function () {
				return getDataList('Payment');
			}
		}
	})
});

//**************Root Mutation Definition********************

//TODO: Add Mutation

//**************Schema Composition********************
const Schema = new GraphQLSchema({
	query: Query
    // Query
});

export default Schema;