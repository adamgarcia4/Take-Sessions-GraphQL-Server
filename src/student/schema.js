


export const Student = `
    type Student {
        _id: String!
        calendarID: String
        user: User
        courseGroups: [CourseGroup]
    }
`;

// export const CourseInput = `
//     input CourseInput {
//         name: String
//         genre: String
//         pic: String
//         price: Int
//         calendarID: String
//         bio: String
//         location: String
//         material: String
//         teacher: [String]
//         courseGroup: [String]
//     }
// `;

export const resolvers = {
    Student: {
        user(root, { }, context) {
            // console.log('stuff is: ', root);
            return context.User.getById(root.userID);
        },
        courseGroups(root, { }, context) {
            return context.CourseGroup.getById(root.courseGroupID);
        }
    }
}



// const Student = new GraphQLObjectType({
// 	name: 'Student',
// 	description: 'This represents a Student Account',
// 	fields: () => ({
// 		_id: { type: GraphQLString },
// 		calendarID: { type: GraphQLString },
// 		user: {
// 			type: User,
// 			resolve: function (student) {
// 				return getBatchData('User', student.userID);
// 			}
// 		},
// 		courseGroup: {
// 			type: new GraphQLList(CourseGroup),
// 			resolve: function (student) {
// 				return getBatchData('CourseGroup', student.courseGroupID);
// 			}
// 		}
// 	})
// });