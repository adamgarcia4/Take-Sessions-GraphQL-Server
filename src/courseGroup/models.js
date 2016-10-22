


export class CourseGroup {
    constructor({ connector }) {
        this.connector = connector;
    }

    getCourseGroupList() {
        //Add any validation here
        
        return this.connector.getDataList('CourseGroup');
    }

    getCourseGroupByCourseID(courseGroupId) {
        return this.connector.getBatchData('CourseGroup', courseGroupId);
    }
}