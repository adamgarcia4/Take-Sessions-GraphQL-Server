
// This is the Schema for the Teacher
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


export const Teacher = `
    type Teacher {
        _id: String!
        calendarID: String
        bio: String
        numhearts: Int
        musicLinks: [String]
        courses: [Course]
        user: User
    }
`;

export const TeacherInput = `
    input TeacherInput {
        calendarID: String
        bio: String
        numhearts: Int
        musicLinks: [String]
        courses: [String]
        user: String
    }
`;

export const resolvers = {
    Teacher: {
        courses(root, { }, context) {
            // console.log('stuff is: ', root);
            return context.Course.getById('Course', root.courseID);
        },
        user(root, { }, context) {
            return context.User.getById('User', root.userID);
        }
    }
}

const mongoSchema = new mongoose.Schema({
    _id: String,
    calendarID: String,
    bio: String,
    numhearts: Number,
    musicLinks: String,
    courses: [String],
    user: String,
});

export const mongoModel = mongoose.model('Teacher', mongoSchema);


// const Teacher = new GraphQLObjectType({
// 	name: 'Teacher',
// 	description: 'This represents a teacher',
// 	fields: () => ({
// 		_id: { type: new GraphQLNonNull(GraphQLString) },
// 		calendarID: { type: GraphQLString },
// 		bio: {type: GraphQLString },
// 		numHearts: { type: GraphQLInt },
// 		musicLinks: { type: new GraphQLList( GraphQLString )},
// 		user: {
// 			type: User,
// 			resolve: function (teacher) {
// 				return getBatchData('User', teacher.userID);
// 			}
// 		},
// 		courses: {
// 			type: new GraphQLList(Course),
// 			resolve: function (teacher) {
// 				return getBatchData('Course', teacher.courseID);
// 			}
// 		},
// 		courseGroup: {
// 			type: new GraphQLList(CourseGroup),
// 			resolve: function (teacher) {
// 				return getBatchData('CourseGroup', teacher.courseGroupID);
// 			}
// 		}
// 	})
// });