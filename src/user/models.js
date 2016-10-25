


export class User {
    constructor({ connector }) {
        this.connector = connector;
    }

    getUserList() {
        //Add any validation here
        
        return this.connector.getDataList('User');
    }

    // getTeacherByCourseID(courseId) {
    //     return this.connector.getBatchData('User', courseId);
    // }
}