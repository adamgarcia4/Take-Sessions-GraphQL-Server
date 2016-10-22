


export const CourseGroup = `
    type CourseGroup {
        _id: String
        # course: Course
        # student: [Student]
        # teacher: [Teacher]
        # session: [Session]
    }
`;

// export const resolvers = {
//     Course: {
//         teacher(root, { }, context) {
//             // console.log('stuff is: ', root);
//             return context.Teacher.getTeacherByCourseID(root.teacherID);
//         },
//         courseGroup(root, { }, context) {
//             return context.CourseGroup.getCourseGroupByCourseID(root.courseGroupID);
//         }
//     }
// }


// const CourseGroup = new GraphQLObjectType({
// 	name: 'CourseGroup',
// 	description: 'This shows the instance of a Course Group',
// 	fields: () => ({
// 		_id: { type: GraphQLString },
// 		course: {
// 			type: Course,
// 			resolve: function (courseGroup) {
// 				return getBatchData('Course', courseGroup.courseID);
// 			}
// 		},
// 		student: {
// 			type: new GraphQLList(Student),
// 			resolve: function (courseGroup) {
// 				return getBatchData('Student', courseGroup.studentID);
// 			}
// 		},
// 		teacher: {
// 			type: new GraphQLList(Teacher),
// 			resolve: function (courseGroup) {
// 				return getBatchData('Teacher', courseGroup.teacherID);
// 			}
// 		},
// 		session: {
// 			type: new GraphQLList(Session),
// 			resolve: function (courseGroup) {
// 				return getBatchData('Session', courseGroup.sessionID);
// 			}
// 		}
// 	})
// });