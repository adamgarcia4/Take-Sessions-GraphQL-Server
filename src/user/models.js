


export class User {
    constructor({ connector }) {
        this.connector = connector;
    }

    getList() {
        //Add any validation here

        return this.connector.getDataList('User');
    }

    getById(id) {
        return this.connector.getBatchData('User', id);
    }

    // getTeacherByCourseID(courseId) {
    //     return this.connector.getBatchData('User', courseId);
    // }
}