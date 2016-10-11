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
	getDataListById,
	getDataById,
	getBatchUsers,
	getBatchStudents,
	getBatchTeachers,
	getBatchCourses,
	getBatchCourseGroups,
	getBatchSessions,
	getBatchPayments
} from './dynamodb';

import {
	coursesList,
	teachersList
} from './fakeData';

// Faked Data can be imported from 'fakeData.js'

var DataLoader = require('dataloader');

var userLoader = new DataLoader(keys => getBatchUsers(keys));
var studentLoader = new DataLoader(keys => getBatchStudents(keys));
var teacherLoader = new DataLoader(keys => getBatchTeachers(keys));
var courseLoader = new DataLoader(keys => getBatchCourses(keys));
var courseGroupLoader = new DataLoader(keys => getBatchCourseGroups(keys));
var sessionLoader = new DataLoader(keys => getBatchSessions(keys));
var paymentLoader = new DataLoader(keys => getBatchPayments(keys));

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
				//var test = [user.studentID];
				return studentLoader.load(user.studentID);
				// return getDataById({tableName:'Student', id: user.studentID});
			}
		},
		teacher: {
			type: Teacher,
			resolve: function (user) {
				return teacherLoader.load(user.teacherID);
				// return getDataById({tableName: 'Teacher', id: user.teacherID});
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
				return userLoader.load(student.userID);
				// return getDataById({tableName: 'User', id: student.userID});
			}
		},
		courseGroup: {
			type: new GraphQLList(CourseGroup),
			resolve: function (student) {
				var iterArr = [];
				var idList = student.courseGroupID;
				for (var i=0; i<idList.length; i++) {
					
					iterArr.push(courseGroupLoader.load(idList[i]));
				}
				return Promise.all(iterArr);
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
				return userLoader.load(teacher.userID);
				// return getDataById({tableName: 'User', id: teacher.userID});
			}
		},
		courses: {
			type: new GraphQLList(Course),
			resolve: function (teacher) {
				var iterArr = [];
				var idList = teacher.courseID;
				console.log(idList);
				for (var i=0; i<idList.length; i++) {
					
					iterArr.push(courseLoader.load(idList[i]));
				}
				return Promise.all(iterArr);				
				// return courseLoader(teacher.courseID);
				// return getDataListById('Course', teacher.courseID);
				
			}
		},
		courseGroup: {
			type: new GraphQLList(CourseGroup),
			resolve: function (teacher) {
				return courseGroupLoader.load(teacher.courseGroupID);
				// return getDataListById('CourseGroup', teacher.courseGroupID);
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
				return teacherLoader.load(course.teacherID);
				// return getDataListById('Teacher', course.teacherID);
			}
		},
		courseGroup: {
			type: new GraphQLList(CourseGroup),
			resolve: function (course) {
				return courseGroupLoader.load(course.courseGroupID);
				// return getDataListById('CourseGroup', course.courseGroupID);
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
				return courseLoader.load(courseGroup.courseID);
				// return getDataById({tableName: 'Course', id: courseGroup.courseID});
			}
		},
		student: {
			type: new GraphQLList(Student),
			resolve: function (courseGroup) {
				return courseGroupLoader.load(courseGroup.studentID);
				// return getDataListById('Student', courseGroup.studentID);
			}
		},
		teacher: {
			type: new GraphQLList(Teacher),
			resolve: function (courseGroup) {
				return teacherLoader.load(courseGroup.teacherID);
				// return getDataListById('Teacher', courseGroup.teacherID);
			}
		},
		session: {
			type: new GraphQLList(Session),
			resolve: function (courseGroup) {
				return sessionLoader.load(courseGroup.sessionID);
				// return getDataListById('Session', courseGroup.sessionID);
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
				return courseGroupLoader.load(session.courseGroupID);
				// return getDataById({tableName: 'CourseGroup', id: session.courseGroupID});
			}
		},
		payment: {
			type: new GraphQLList(Payment),
			resolve: function (session) {
				return paymentLoader.load(session.paymentID);
				// return getDataListById('Payment', session.paymentID);
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
				return sessionLoader.load(payment.sessionID);
				// return getDataById({tableName: 'Session', id: payment.sessionID});
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