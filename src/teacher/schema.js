


export const Teacher = `
    type Teacher {
        _id: String!
        calendarID: String
        bio: String
        numhearts: Int
        musicLinks: [String]
        # user: User
        # courses: [Course]
        # courseGroup: [CourseGroup]
    }
`;


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