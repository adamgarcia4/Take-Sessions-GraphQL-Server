
// This is the Schema for the CourseGroup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


export const CourseGroup = `
    type CourseGroup {
        _id: String
        testField: String
        course: Course
        students: [Student]
        teachers: [Teacher]
        sessions: [Session]
    }
`;

export const CourseGroupInput = `
    input CourseGroupInput {
        testField: String
        course: String
        user: String
        students: [String]
        teachers: [String]
        sessions: [String]
    }
`;

export const resolvers = {
    CourseGroup: {
        course(root, { }, context) {
            // console.log('stuff is: ', root);
            return context.Course.getById(root.courseID);
        },
        students(root, { }, context) {
            return context.Student.getById(root.studentID);
        },
        teachers(root, { }, context) {
            // console.log('stuff is: ', root);
            return context.Teacher.getById(root.teacherID);
        },
        sessions(root, { }, context) {
            return context.Session.getById(root.sessionID);
        }
    }
}

const mongoSchema = new mongoose.Schema({
    _id: String,
    testField: String,
    course: String,
    user: String,
    students: [String],
    teachers: [String],
    sessions: [String]
});

export const mongoModel = mongoose.model('CourseGroup', mongoSchema);