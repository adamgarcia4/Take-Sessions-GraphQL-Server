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

import { // This contains all calls to be made to DynamoDB
	getDataList, //TODO: Get Caching working on Data List
	getBatchData
} from './dynamodb';

import {
	coursesList,
	teachersList
} from './fakeData';

// Faked Data can be imported from 'fakeData.js'

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
		name: { type: GraphQLString },
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
		user: {
			type: User,
			args: {
				id: {
					name: 'id',
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: function (root, {id}, source) {
				return getBatchData('User', id);
			}
		},
		users: {
			type: new GraphQLList(User),
			resolve: function () {
				// return getUsers('take-sessions-users');
				return getDataList('User');
			}
		},
		student: {
			type: Student,
			args: {
				id: {
					name: 'id',
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: function (root, {id}, source) {
				return getBatchData('Student', id);
			}
		},
		students: {
			type: new GraphQLList(Student),
			resolve: function () {
				return getDataList('Student');
			}
		},
		teacher: {
			type: Teacher,
			args: {
				id: {
					name: 'id',
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: function (root, {id}, source) {
				return getBatchData('Teacher', id);
			}
		},
		teachers: {
			type: new GraphQLList(Teacher),
			resolve: function () {
				// return teachersList;
				return getDataList('Teacher');
			}
		},
		course: {
			type: Course,
			args: {
				id: {
					name: 'id',
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: function (root, {id}, source) {
				return getBatchData('Course', id);
			}
		},
		courses: {
			type: new GraphQLList(Course),
			resolve: function () {
                return getDataList('Course');
			}
		},
		courseGroup: {
			type: CourseGroup,
			args: {
				id: {
					name: 'id',
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: function (root, {id}, source) {
				return getBatchData('CourseGroup', id);
			}
		},
		courseGroups: {
			type: new GraphQLList(CourseGroup),
			resolve: function () {
				return getDataList('CourseGroup');
			}
		},
		session: {
			type: Session,
			args: {
				id: {
					name: 'id',
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: function (root, {id}, source) {
				return getBatchData('Session', id);
			}
		},
		sessions: {
			type: new GraphQLList(Session),
			resolve: function () {
				return getDataList('Session');
			}
		},
		payment: {
			type: Payment,
			args: {
				id: {
					name: 'id',
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: function (root, {id}, source) {
				return getBatchData('Payment', id);
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