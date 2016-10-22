
// This is the Schema for the Course
export const Course = `
    type Course {
        _id: String!
        name: String
        genre: String
        pic: String
        price: Int
        calendarID: String
        bio: String
        location: String
        material: String
        # teacher: [Teacher]
        # courseGroup: [CourseGroup]
    }
`;

// export default () => [Course]; //Need to export all dependencies to keep it modular

// const Course = new GraphQLObjectType({
// 	name: 'Course',
// 	description: 'This represents a teacher\'s course',
// 	fields: () => ({
// 		_id: { type: GraphQLString },
// 		name: { type: GraphQLString },
//         genre: { type: GraphQLString },
//         pic: { type: GraphQLString },
//         price: { type: GraphQLInt },
//         calendarID: { type: GraphQLString },
//         bio: { type: GraphQLString },
//         location: { type: GraphQLString },
//         material: { type: GraphQLString },
// 		teacher: {
// 			type: new GraphQLList(Teacher),
// 			resolve: function (course) {
// 				return getBatchData('Teacher', course.teacherID);
// 			}
// 		},
// 		courseGroup: {
// 			type: new GraphQLList(CourseGroup),
// 			resolve: function (course) {
// 				return getBatchData('CourseGroup', course.courseGroupID);
// 			}
// 		}
// 	})
// });