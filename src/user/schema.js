


export const User = `
    type User {
        _id: String!
        firstName: String
        lastName: String
        birthday: String
        email: String
        avatar: String
        phoneNumber: String
        location: String
        student: Student
        teacher: Teacher
    }
`;

export const UserInput = `
    input UserInput {
        _id: String!
        firstName: String
        lastName: String
        birthday: String
        email: String
        avatar: String
        phoneNumber: String
        location: String
        # student: String
        # teacher: String
    }
`;

export const resolvers = {
    User: {
        student(root, { }, context) {
            // console.log('stuff is: ', root);
            return context.Student.getById(root.studentID);
        },
        teacher(root, { }, context) {
            return context.Teacher.getById(root.teacherID);
        }
    }
}


// const User = new GraphQLObjectType({
// 	name: 'User',
// 	description: 'This represents a single User',
// 	fields: () => ({
// 		_id: { type: new GraphQLNonNull(GraphQLString) },
// 		firstName: { type: GraphQLString },
// 		lastName: { type: GraphQLString },
// 		birthday: { type: GraphQLString },
// 		email: { type: GraphQLString },
// 		avatar: { type: GraphQLString },
// 		phoneNumber: { type: GraphQLString },
// 		location: { type: GraphQLString },
// 		student: {
// 			type: Student,
// 			resolve: function (user) {
// 				return getBatchData('Student', user.studentID);
// 			}
// 		},
// 		teacher: {
// 			type: Teacher,
// 			resolve: function (user) {
// 				return getBatchData('Teacher', user.teacherID);
// 			}
// 		}
// 	})
// });