


export class Course {
    constructor({ connector }) {
        this.connector = connector;
    }

    getCourseList() {
        //Add any validation here
        
        return this.connector.getDataList('Course');
    }
}