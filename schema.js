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
	getCourses,
	getStudents,
	getStudent
} from './dynamodb';

//**************Fake Data********************
const usersList = [
	{
		_id: 'U1',
		name: 'Adam',
		teacherID: 'T1',
		studentID: 'S1'
	},
	{
		_id: 'U2',
		name: 'JJ',
		studentID: 'S2'
	}
];

// const studentsList = [
// 	{
// 		_id: 'S1',
// 		userID: 'U1',
// 		courseGroupID: [
// 			'CG1',
// 			'CG2'
// 		]
// 	},
// 	{
// 		_id: 'S2',
// 		userID: 'U2',
// 		courseGroupID: [
// 			'CG2',
// 			'CG3',
// 			'CG1'
// 		]
// 	}
// ];

const teachersList = [
	{
		_id: 'T1',
		userID: 'U1',
		genre: 'house',
		courseID: [
			'C1',
			'C3'
		],
		courseGroupID: [
			'CG1',
			'CG2'
		]
	},
	{
		_id: 'T2',
		userID: 'U2',
		genre: 'pop',
		courseID: [
			'C1',
			'C2'
		],
		courseGroupID: [
			'CG2',
			'CG3'
		]
	}
];

const coursesList = [
	{
		_id: 'C1',
		name: 'course 1',
		teacherID: [
			'T1',
			'T2'
		],
		courseGroupID: [
			'CG1',
			'CG2'
		]
	},
	{
		_id: 'C2',
		name: 'course 2',
		teacherID: [
			'T2'
		],
		courseGroupID: [
			'CG3'
		]
	},
	{
		_id: 'C3',
		name: 'course 3',
		teacherID: [

		],
		courseGroupID: [

		]

	}
];

const courseGroupList = [
	{
		_id: 'CG1',
		courseID: 'C1',
		studentID: [
			'S1',
			'S2'
		],
		teacherID: [
			'T1'
		],
		sessionID: [
			'Sess1'
		]

	},
	{
		_id: 'CG2',
		courseID: 'C1',
		studentID: [
			'S1',
			'S2'
		],
		teacherID: [
			'T1',
			'T2'
		],
		sessionID: [
			'Sess2'
		]
	},
	{
		_id: 'CG3',
		courseID: 'C2',
		studentID: [
			'S1'
		],
		teacherID: [
			'T2'
		],
		sessionID: [
			'Sess1'
		]
	}
]

const sessionsList = [
	{
		_id: 'Sess1',
		courseGroupID: 'CG1',
		paymentID: [
			'P1'
		]
	},
	{
		_id: 'Sess2',
		courseGroupID: 'CG2',
		paymentID: [
			'P2'
		]
	}
]

const paymentsList = [
	{
		_id: 'P1',
		sessionID: 'Sess1'
	},
	{
		_id: 'P2',
		sessionID: 'Sess2'
	}

]

//**************Object Definitions********************

const User = new GraphQLObjectType({
	name: 'User',
	description: 'This represents a single User',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		student: {
			type: Student,
			resolve: function (user) {
				// return teachersList.find(teacher => teacher._id == user.teacherID);
				// return studentsList.find(function (student) {
				// 	return student._id == user.studentID;
				// });
				console.log('user id: ', user.studentID);
				return getStudent(user.studentID);
			}
		},
		teacher: {
			type: Teacher,
			resolve: function (user) {
				// return teachersList.find(teacher => teacher._id == user.teacherID);
				return teachersList.find(function (teacher) {
					return teacher._id == user.teacherID;
				});
			}
		}
	})
});

const Student = new GraphQLObjectType({
	name: 'Student',
	description: 'This represents a Student Account',
	fields: () => ({
		_id: { type: GraphQLString },
		user: {
			type: User,
			resolve: function (student) {
				return usersList.find(function (user) {
					return user._id == student.userID;
				})
			}
		},
		courseGroup: {
			type: new GraphQLList(CourseGroup),
			resolve: function (student) {
				var test = courseGroupList.filter(function (courseGroup) {
					for (var i = 0; i < student.courseGroupID.length; i++) {
						if (courseGroup._id == student.courseGroupID[i])
							return true;
					}
				});
				return test;
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
				return usersList.find(function (user) {
					return user._id == teacher.userID;
				});
			}
		},
		courses: {
			type: new GraphQLList(Course),
			resolve: function (teacher) {
				// return coursesList.find(function(course) {
				// 	return course._id == teacher.courseID[1]
				// });
				//console.log('teacher: ', teacher);

				var test = coursesList.filter(function (course) {
					//console.log('course: ',course);
					for (var i = 0; i < teacher.courseID.length; i++) {
						//console.log(course._id,teacher.courseID[i]);
						if (course._id == teacher.courseID[i]) {
							return true;
						}
					}
				});
				//console.log('test', test);
				return test;
			}
		},
		courseGroup: {
			type: new GraphQLList(CourseGroup),
			resolve: function (teacher) {
				var test = courseGroupList.filter(function (courseGroup) {
					for (var i = 0; i < teacher.courseGroupID.length; i++) {
						if (courseGroup._id == teacher.courseGroupID[i]) {
							return true;
						}
					}
				});
				return test;
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
				//console.log('course: ', course);
				var test = teachersList.filter(function (teacher) {
					//console.log('course teacherID length: ', course.teacherID.length);
					for (var i = 0; i < course.teacherID.length; i++) {
						//console.log('i: ', i);
						//console.log('teacher id:  ', teacher._id);
						//console.log('course teacher id: ', course.teacherID[i]);
						if (teacher._id == course.teacherID[i]) {
							return true;
						}
					}
				});
				return test;
			}
		},
		courseGroup: {
			type: new GraphQLList(CourseGroup),
			resolve: function (course) {
				var test = courseGroupList.filter(function (courseGroup) {
					for (var i = 0; i < course.courseGroupID.length; i++) {
						if (courseGroup._id == course.courseGroupID[i]) {
							return true;
						}
					}
				});
				return test;
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
				return coursesList.find(function (course) {
					return course._id == courseGroup.courseID;
				})
			}
		},
		student: {
			type: new GraphQLList(Student),
			resolve: function (courseGroup) {
				var test = studentsList.filter(function (student) {
					for (var i = 0; i < courseGroup.studentID.length; i++) {
						if (student._id == courseGroup.studentID[i]) {
							return true;
						}
					}
				});
				return test;
			}
		},
		teacher: {
			type: new GraphQLList(Teacher),
			resolve: function (courseGroup) {
				var test = teachersList.filter(function (teacher) {
					for (var i = 0; i < courseGroup.teacherID.length; i++) {
						if (teacher._id == courseGroup.teacherID[i]) {
							return true;
						}
					}
				});
				return test;
			}
		},
		session: {
			type: new GraphQLList(Session),
			resolve: function (courseGroup) {
				var test = sessionsList.filter(function (session) {
					for (var i = 0; i < courseGroup.sessionID.length; i++) {
						if (session._id == courseGroup.sessionID[i]) {
							return true;
						}
					}
				});
				return test;
			}
		}
	})
})

const Session = new GraphQLObjectType({
	name: 'Session',
	description: 'This represents a single Session',
	fields: () => ({
		_id: { type: GraphQLString },
		courseGroup: {
			type: CourseGroup,
			resolve: function (session) {
				return courseGroupList.find(function (courseGroup) {
					return courseGroup._id == session.courseGroupID;
				})
			}
		},
		payment: {
			type: new GraphQLList(Payment),
			resolve: function (session) {
				var test = paymentsList.filter(function (payment) {
					for (var i = 0; i < session.paymentID.length; i++) {
						console.log(payment._id);
						console.log(session.paymentID[i]);
						if (payment._id == session.paymentID[i]) {
							return true;
						}
					}
				});
				return test;
			}
		}		
	})
})

const Payment = new GraphQLObjectType({
	name: 'Payment',
	description: 'This represents a single Payment',
	fields: () => ({
		_id: { type: GraphQLString },
		session: {
			type: Session,
			resolve: function (payment) {
				//console.log('session ID: ', session._id);
				return sessionsList.find(function (session) {
					return payment._id == session.paymentID;
				})
			}
		}

	})
})

//**************Root Query Definition********************

const Query = new GraphQLObjectType({
	name: 'BlogSchema',
	description: 'Root of the Blog Schema',
	fields: () => ({
		users: {
			type: new GraphQLList(User),
			resolve: function () {
				return usersList;
			}
		},
		students: {
			type: new GraphQLList(Student),
			resolve: function () {
				return getStudents();
			}
		},
		teachers: {
			type: new GraphQLList(Teacher),
			resolve: function () {
				return teachersList;
			}
		},
		courses: {
			type: new GraphQLList(Course),
			resolve: function () {
                return getCourses();
				// return coursesList;
			}
		},
		courseGroup: {
			type: new GraphQLList(CourseGroup),
			resolve: function () {
				return courseGroupList;
			}
		},
		sessions: {
			type: new GraphQLList(Session),
			resolve: function () {
				return sessionsList;
			}
		},
		payments: {
			type: new GraphQLList(Payment),
			resolve: function () {
				return paymentsList;
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