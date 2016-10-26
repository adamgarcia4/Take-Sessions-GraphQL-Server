


export const CourseGroup = `
    type CourseGroup {
        _id: String
        course: Course
        students: [Student]
        teachers: [Teacher]
        sessions: [Session]
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