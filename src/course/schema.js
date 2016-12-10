
// This is the Schema for the Course
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

import Teacher from '../teacher/schema';

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
        teachers: [Teacher]
        courseGroups: [CourseGroup]
    }
`;

export const CourseInput = `
    input CourseInput {
        name: String
        genre: String
        pic: String
        price: Int
        calendarID: String
        bio: String
        location: String
        material: String
        teacher: [String]
        courseGroup: [String]
    }
`;

export const resolvers = {
    Course: {
        teachers(root, { }, context) {
            // console.log('stuff is: ', root);
            return context.Teacher.getById(root.teacherID);
        },
        courseGroups(root, { }, context) {
            return context.CourseGroup.getById(root.courseGroupID);
        }
    }
}

//Circumvents the "Cannot recompile schema" error
const mongoSchema = new mongoose.Schema({
    _id: String,
    name: String,
    genre: String,
    pic: String,
    price: Number,
    calendarID: String,
    bio: String,
    location: String,
    material: String,
    teachers: [String],
    courseGroups: [String]
});

export const mongoModel = mongoose.model('Course', mongoSchema);
//module.exports = mongoose.model('Course', CourseSchema);



// export default () => [Course, Teacher];

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