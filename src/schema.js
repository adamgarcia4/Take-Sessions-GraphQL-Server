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
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		birthday: { type: GraphQLString },
		email: { type: GraphQLString },
		avatar: { type: GraphQLString },
		phoneNumber: { type: GraphQLString },
		location: { type: GraphQLString },
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

const UserInputType = new GraphQLInputObjectType({
	name: 'UserInput',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		firstName: { type: new GraphQLNonNull(GraphQLString) },
		lastName: { type: new GraphQLNonNull(GraphQLString) },
		birthday: { type: new GraphQLNonNull(GraphQLString) },
		email: { type: new GraphQLNonNull(GraphQLString) },
		avatar: { type: new GraphQLNonNull(GraphQLString) },
		phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
		location: { type: new GraphQLNonNull(GraphQLString) },
		studentID: { type: GraphQLString },
		teacherID: { type: GraphQLString }
	})
});

const UserAttributesInputType = new GraphQLInputObjectType({
	name: 'UserAttributes',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		birthday: { type: GraphQLString },
		email: { type: GraphQLString },
		avatar: { type: GraphQLString },
		phoneNumber: { type: GraphQLString },
		location: { type: GraphQLString },
		studentID: { type: GraphQLString },
		teacherID: { type: GraphQLString }
	})
});

const Student = new GraphQLObjectType({
	name: 'Student',
	description: 'This represents a Student Account',
	fields: () => ({
		_id: { type: GraphQLString },
		calendarID: { type: GraphQLString },
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

const StudentInputType = new GraphQLInputObjectType({
	name: 'StudentInput',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		calendarID: { type: GraphQLString },
		userID: { type: GraphQLString },
		courseGroupID: { type: new GraphQLList(GraphQLString) }
	})
});

const StudentAttributesInputType = new GraphQLInputObjectType({
	name: 'UserAttributes',
	fields: () => ({
		_id: { type: GraphQLString },
		calendarID: { type: GraphQLString }
	})
})

const Teacher = new GraphQLObjectType({
	name: 'Teacher',
	description: 'This represents a teacher',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		calendarID: { type: GraphQLString },
		bio: {type: GraphQLString },
		numHearts: { type: GraphQLInt },
		musicLinks: { type: new GraphQLList( GraphQLString )},
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

const TeacherInputType = new GraphQLInputObjectType({
	name: 'TeacherInput',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		calendarID: { type: GraphQLString },
		bio: { type: GraphQLString },
		numHearts: { type: GraphQLString },
		musicLinks: { type: GraphQLString },
		userID: { type: GraphQLString },
		courseID: { type: new GraphQLList( GraphQLString )},
		courseGroupID: { type: new GraphQLList(GraphQLString)}
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

const CourseInputType = new GraphQLInputObjectType({
	name: 'CourseInput',
	fields: () => ({
		// _id: { type: new GraphQLNonNull(GraphQLString) },
		name: { type: new GraphQLNonNull(GraphQLString) },
		genre: { type: new GraphQLNonNull(GraphQLString) },
		// pic: { type: new GraphQLNonNull(GraphQLString) },
		price: { type: new GraphQLNonNull(GraphQLString) },
		// calendarID: { type: new GraphQLNonNull(GraphQLString) },
		bio: { type: new GraphQLNonNull(GraphQLString) },
		// location: { type: new GraphQLNonNull(GraphQLString) },
		material: { type: new GraphQLNonNull(GraphQLString) },
		teacherID: { type: new GraphQLList( GraphQLString ) },
		courseGroupID: { type: new GraphQLList( GraphQLString )}
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

const CourseGroupInputType = new GraphQLInputObjectType({
	name: 'CourseGroupInput',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		courseID: { type: GraphQLString },
		studentID: { type: new GraphQLList(GraphQLString)},
		teacherID: { type: new GraphQLList(GraphQLString)},
		sessionID: { type: new GraphQLList(GraphQLString)}
	})
});


const Session = new GraphQLObjectType({
	name: 'Session',
	description: 'This represents a single Session',
	fields: () => ({
		_id: { type: GraphQLString },
		startTime: {type: GraphQLString},
		endTime: {type: GraphQLString},
		review: {type: GraphQLInt},
		status: {type: GraphQLString},
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

const SessionInputType = new GraphQLInputObjectType({
	name: 'SessionInput',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		startTime: { type: GraphQLString},
		endTime: {type: GraphQLString},
		review: {type: GraphQLInt},
		status: {type: GraphQLString},
		courseGroupID: {type: GraphQLString},
		paymentID: {type: new GraphQLList(GraphQLString)}
	})
});

const Payment = new GraphQLObjectType({
	name: 'Payment',
	description: 'This represents a single Payment',
	fields: () => ({
		_id: { type: GraphQLString },
		price: {type: GraphQLInt},
		balance: {type: GraphQLInt},
		session: {
			type: Session,
			resolve: function (payment) {
				return getBatchData('Session', payment.sessionID);
			}
		}
	})
});

const PaymentInputType = new GraphQLInputObjectType({
	name: 'SessionInput',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		price: {type: GraphQLInt},
		balance: {type: GraphQLInt},
		sessionID: {type: GraphQLString}		
		
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

const Mutation = new GraphQLObjectType({
	name: 'Mutations',
	description: 'List of all Mutations',
	fields: () => ({
		createUser: {
			type: User,
			description: 'Create New User.',
			args: {
				user: { type: UserInputType }
			},
			resolve: (root, { user }) => {
				return putData('User', user);
			}
		},
		updateUser: {
			type: User,
			description: 'Update User',
			args: {
				user: { type: UserAttributesInputType }
			},
			resolve: (root, { user }) => {
				console.log('user is: ', user);
				return updateData('User', user);
			}
		},
		createStudent: {
			type: Student,
			description: 'Create New Student.',
			args: {
				student: { type: StudentInputType }
			},
			resolve: (root, { student }) => {
				return putData('Student', student);
			}
		},
		createTeacher: {
			type: Teacher,
			description: 'Create New Teacher.',
			args: {
				teacher: { type: TeacherInputType }
			},
			resolve: (root, { teacher }) => {
				return putData('Teacher', teacher);
			}
		},
		createCourse: {
			type: Course,
			description: 'Create New Course.',
			args: {
				course: { type: CourseInputType }
			},
			resolve: (root, { course }) => {
				return createCourse(course);
				// return putData('Course', course);
			}
		},		
	})
});



//**************Root Mutation Definition********************

//TODO: Add Mutation

//**************Schema Composition********************
const Schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
    // Query
});

export default Schema;