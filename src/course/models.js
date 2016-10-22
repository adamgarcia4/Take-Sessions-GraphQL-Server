


export class Course {
    constructor({ connector }) {
        this.connector = connector;
    }

    getCourseList() {
        //Add any validation here
        
        return this.connector.getDataList('Course');
    }

    getCourseByID(_id) {
        return this.connector.getBatchData('Course', _id);
    }
}