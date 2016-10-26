


export class CourseGroup {
    constructor({ connector }) {
        this.connector = connector;
    }

    getList() {
        //Add any validation here
        
        return this.connector.getDataList('CourseGroup');
    }

    getById(courseGroupId) {
        return this.connector.getBatchData('CourseGroup', courseGroupId);
    }

    //create
}